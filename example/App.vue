<template>
  <v-app id="app">
    <v-content>
      <v-container fluid>
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

              <v-layout row>
                <v-flex md6 sm12 class="pr-2">
                  <v-text-field name="name" label="Full name" type="text" v-model="cardDetail.name" />
                </v-flex>

                <v-flex md6 sm12 class="pl-2">
                  <v-text-field name="number" label="Credit number" type="tel" v-model="cardDetail.number" />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex md6 sm12 class="pr-2">
                  <v-text-field name="expiry" label="MM/YY" type="tel" v-model="cardDetail.expiry" />
                </v-flex>

                <v-flex md6 sm12 class="pl-2">
                  <v-text-field
                    name="cvc"
                    label="CVC"
                    type="tel"
                    maxlength="3213"
                    v-model="cardDetail.cvc"
                    @focus="invertedCard = true"
                    @blur="invertedCard = false"
                  />

                </v-flex>
              </v-layout>
            </header>
          </div>
        </div>
      </v-container>
    </v-content>
  </v-app>
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

<style>
  @import '~vuetify/dist/vuetify.min.css'
</style>
