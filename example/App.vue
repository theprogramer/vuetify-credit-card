<template>
  <div id="app">
    <a class="github-fork-ribbon" href="https://github.com/iliojunior/vuetify-credit-card" title="Fork me on GitHub">Fork me on GitHub</a>
    <div class="header-container">
      <div class="header-bg" :style="{'background-color': bgc}"></div>
        <header class="header">
          <div class="intro-wrap">
            <div class="intro">
              <h1>Vuetify Credit Card</h1>
              <p>This is an Vue.js wrapper for the amazing <a href="https://github.com/jessepollak/card">Card</a> project.</p>
            </div>
          </div>

          <div class="card-wrapper mb-5">
            <card v-model="cardDetail" v-bind:invert-card.sync="invertedCard"></card>
          </div>

          <input name="number" placeholder="Card number" type="tel" v-model="cardDetail.number" v-card-focus>
          <input name="name" placeholder="Full name" type="text" v-model="cardDetail.name" v-card-focus>
          <input name="expiry" placeholder="MM/YY" type="tel" v-model="cardDetail.expiry" v-card-focus>
          <input
            name="cvc"
            placeholder="CVC"
            type="number"
            v-model="cardDetail.cvc"
            @focus="invertedCard = true"
            @blur="invertedCard = false"
            v-card-focus
            />
        </header>
      </div>
    </div>
  </div>
</template>

<script>
import card from '../src/components/Card.vue'

let defaultProps = {
  number: '4532117080573700',
  name: 'Comprador T Cielo',
  expiry: '12/2018',
  cvc: '123'
}

export default {
  name: 'Card',
  components: {
    card
  },
  data () {
    return {
      cardDetail: defaultProps,
      invertedCard: false
    }
  }
}
</script>
