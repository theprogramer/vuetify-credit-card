<template lang="pug">
  v-app
    v-container
      v-layout(row wrap)
        .title Vuetify Credit Card
      v-layout(row wrap)
        span.caption Based on project&nbsp;
          a(
            href="https://github.com/thiago-Malaca/vue-credit-card"
            target="_blank"
            ) 'vue-credit-card'.
      v-layout(row wrap)
        span.caption This project is refactored with Pugjs and Stylus, following the&nbsp;
          a(
            href="https://github.com/guastallaigor/puzzle-pattern"
            target="_blank"
            ) Puzzle-Pattern.
      v-layout(row wrap)
        span.caption Refactored by&nbsp;
          a(
            href="https://github.com/iliojunior"
            target="_blank"
            ) Ilio Adriano de Oliveira Junior (ilioadriano@live.com).
      v-layout(row wrap)
        a.caption(
          href="https://github.com/iliojunior/vuetify-credit-card"
          target="_blank"
          ) Fork on Github.
      v-layout(row wrap)
        a.caption(
          href="https://www.npmjs.com/package/vuetify-credit-card"
          target="_blank"
          ) NPM.
      br
      v-layout(row wrap)
        v-flex(xs12 md6)
          v-layout(row wrap)
            v-flex.pr-2(xs12 md6)
              v-text-field(
                name="number"
                label="Card number"
                v-model="cardDetail.number"
                )
            v-flex(xs12 md6)
              v-text-field(
                name="name"
                label="Full Name"
                v-model="cardDetail.name"
                )
          v-layout(row wrap)
            v-flex.pr-2(xs12 md6)
              v-text-field(
                name="expiry"
                label="MM/YY"
                v-model="cardDetail.expiry"
                )
            v-flex(xs12 md6)
              v-text-field(
                name="name"
                label="CVC"
                v-model="cardDetail.cvc"
                @focus="invertedCard = true"
                @blur="invertedCard = false"
                )
        v-spacer
        v-flex(xs12 md3)
          card(
            v-model="cardDetail"
            :invert-card.sync="invertedCard"
            )
</template>

<script>
import Card from '@/components/Card'

const defaultCreditCardData = {
  number: '5145607790954405',
  name: 'Name of Mastercard',
  expiry: '12/2018',
  cvc: '123'
}

export default {
  name: 'card-example',

  components: {
    Card
  },

  data: () => ({
    cardDetail: defaultCreditCardData,
    invertedCard: false
  })
}
</script>
