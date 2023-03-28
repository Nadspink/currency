<script>
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import FavoriteCurrency from './components/FavoriteCurrency.vue'
import UpdateButton from './components/UpdateButton.vue'
import MainCurrency from './components/MainCurrency.vue'

export default {
  components: {
    FavoriteCurrency,
    UpdateButton,
    MainCurrency
  },
  setup() {
    async function getPriceData() {
      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=USD,EUR,UAH,GBP,BTC,ETH,BNB,XRP`
      )
      currencyData.value = response.data
    }
    onMounted(() => {
      getPriceData()
    })
    const currencyData = reactive({})
    return { currencyData, getPriceData }
  }
}
</script>

<template>
  <main>
    <MainCurrency :currencyData="currencyData" />
    <FavoriteCurrency :data="currencyData" />
    <UpdateButton @getPriceData="getPriceData" />
  </main>
</template>

<style scoped>
main {
  width: 400px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
}
</style>
