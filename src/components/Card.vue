<template lang="pug">
  #card
    .jp-card-container
      .jp-card(:class="classCard")
        .jp-card-front
          .jp-card-logo.jp-card-elo
            .e e
            .l l
            .o o
          .jp-card-logo.jp-card-visa Visa
          .jp-card-logo.jp-card-mastercard MasterCard
          .jp-card-logo.jp-card-maestro Maestro
          .jp-card-logo.jp-card-amex
          .jp-card-logo.jp-card-discover Discover
          .jp-card-logo.jp-card-dankort
            .dk
              .d
              .k
          .jp-card-lower
            .jp-card-shiny
            .jp-card-cvc.jp-card-display(:class="classDisplay['cvc']") {{ display.cvc }}
            .jp-card-number.jp-card-display(:class="classDisplay['number']") {{ display.number }}
            .jp-card-name.jp-card-display(:class="classDisplay['name']") {{ display.name }}
            .jp-card-expiry.jp-card-display(
              :class="classDisplay['expiry']"
              :data-before="options.monthYear"
              :data-after="options.validDate"
              ) {{ display.expiry }}
        .jp-card-back
          .jp-card-bar
          .jp-card-cvc.jp-card-display(:class="classDisplay['cvc']") {{ display.cvc }}
          .jp-card-shiny
    slot
</template>

<script>
import Payment from 'payment/lib'
import CardService from './CardService'

const fns = {
  formatCardExpiry: val => val.replace(/^([0-9]{2})\/?([0-9]{2,4})$/mg, '$1 / $2')
}

const __guard__ = (value, transform) => {
  return (typeof value !== 'undefined' && value !== null)
    ? transform(value)
    : undefined
}

export default {
  name: 'card',

  props: {
    value: {
      type: Object,
      default: () => CardService.emptyCreditCardData
    },
    invertCard: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    isSafari: false,
    isIE10: false,
    isIE11: false,
    cardType: null,
    options: CardService.options,
    classDisplay: CardService.classDisplay
  }),

  created () {
    if (CardService.options.formatting) {
      this.formatValues()
    }

    this.checkBrowser()
  },

  computed: {
    classCard () {
      const {
        value,
        setCardType
      } = this
      const { cardTypes: cardTypesOptions } = CardService.options
      const classesObj = {
        'jp-card-safari': this.isSafari,
        'jp-card-ie-10': this.isIE10,
        'jp-card-ie-11': this.isIE11,
        'jp-card-flipped': this.invertCard
      }

      setCardType(value.number)

      classesObj['jp-card-identified'] = !!this.cardType

      let knownFlag = false

      cardTypesOptions.forEach(type => {
        if (this.cardType === type) {
          const positionClass = 'jp-card-' + type
          knownFlag = true
          classesObj[positionClass] = knownFlag
        }
      })

      if (!knownFlag) {
        classesObj['jp-card-unknown'] = true
      }

      return classesObj
    },

    display () {
      const { value } = this
      const { inputTypes: optionsInputType } = CardService.options

      value.number = Payment.fns.formatCardNumber(value.number)
      value.expiry = fns.formatCardExpiry(value.expiry)

      optionsInputType.forEach(type => {
        const valided = CardService
          .rules
          .validate(type, value[type], this.cardType)

        const { setClass } = CardService.classDisplay

        setClass(type, 'jp-card-valid', valided)
        setClass(type, 'jp-card-invalid', !valided)

        CardService.classDisplay[type]['jp-card-valid'] = valided
        CardService.classDisplay[type]['jp-card-invalid'] = !valided
      })

      let valueObject = Object.assign({}, value)

      Object
        .keys(valueObject)
        .forEach(key => !valueObject[key] && delete valueObject[key])

      valueObject = Object.assign({}, CardService.options.placeholders, valueObject)

      return {
        number: valueObject.number,
        name: valueObject.name,
        expiry: valueObject.expiry.replace(/(\s+)/g, ''),
        cvc: valueObject.cvc
      }
    }
  },

  methods: {
    setCardType (number) {
      const { cardType: cardTypeFns } = Payment.fns
      this.cardType = cardTypeFns(number)
    },

    checkBrowser () {
      // safari can't handle transparent radial gradient right now
      if (__guard__(navigator, x => x.userAgent)) {
        let ua = navigator.userAgent.toLowerCase()
        if ((ua.indexOf('safari') !== -1) && (ua.indexOf('chrome') === -1)) {
          this.isSafari = true
        }
      }
      if (/MSIE 10\./i.test(navigator.userAgent)) {
        this.isIE10 = true
      }
      // ie 11 does not support conditional compilation, use user agent instead
      if (/rv:11.0/i.test(navigator.userAgent)) {
        this.isIE11 = true
      }
    },

    formatValues () {
      const {
        validateCardCVC,
        validateCardExpiry,
        validateCardNumber
      } = this

      const {
        cvc,
        expiry,
        number
      } = this.value

      if (!validateCardCVC(cvc)) {
        console.error('CVC number isn\'t valid:', cvc)
      }

      if (!validateCardExpiry(expiry)) {
        console.error('Expiration date isn\'t valid:', expiry)
      }

      if (!validateCardNumber(number)) {
        console.error('Card number isn\'t valid:', number)
      }
    },

    validateCardCVC (cvc) {
      return Payment
        .fns
        .validateCardCVC(cvc)
    },

    validateCardExpiry (expiry) {
      return Payment
        .fns
        .validateCardExpiry(expiry)
    },

    validateCardNumber (number) {
      return Payment
        .fns
        .validateCardNumber(number)
    }
  },

  watch: {
    invertCard (val) {
      this.$emit('update:invert-card', val)
    }
  }
}
</script>

<style lang="stylus">
@import "../stylus/card"
</style>
