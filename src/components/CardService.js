import Payment from 'payment/lib'

const options = {
  formatting: false,
  monthYear: 'month/year',
  validDate: 'valid\nthru',
  cardTypes: [
    'amex',
    'dankort',
    'dinersclub',
    'discover',
    'jcb',
    'laser',
    'maestro',
    'mastercard',
    'unionpay',
    'visa',
    'visaelectron',
    'elo'
  ],
  inputTypes: [
    'number',
    'name',
    'expiry',
    'cvc'
  ],
  placeholders: {
    number: '•••• •••• •••• ••••',
    cvc: '•••',
    expiry: '••/••',
    name: 'Full Name'
  }
}

const defaultClassDisplay = {
  'jp-card-focused': false,
  'jp-card-valid': false,
  'jp-card-invalid': false
}

const clone = (value) => {
  return {...value}
}

const classDisplay = {
  number: clone(defaultClassDisplay),
  name: clone(defaultClassDisplay),
  expiry: clone(defaultClassDisplay),
  cvc: clone(defaultClassDisplay),

  setClass: (type, className, value) => {
    const classDisplayType = classDisplay[type]
    classDisplayType[className] = value
  }
}

options
  .inputTypes
  .forEach(type => {
    classDisplay[type] = {
      'jp-card-focused': false,
      'jp-card-valid': false,
      'jp-card-invalid': false
    }
  })

const rules = {
  number: val => Payment.fns.validateCardNumber(val),
  name: val => !!val,
  cvc: (val, cardType) => Payment.fns.validateCardCVC(val, cardType),
  expiry: val => {
    const valueObject = Payment
      .fns
      .cardExpiryVal(val)

    return Payment.fns.validateCardExpiry(valueObject.month, valueObject.year)
  },
  validate: (type, value, cardType) => {
    const rule = rules[type]
    return rule(value, cardType)
  }
}

export default {
  options,
  rules,
  classDisplay
}
