<script>
import { ref, watch } from 'vue'
import ModalSearchWindow from './ModalSearchWindow.vue'

export default {
  props: {
    data: {
      type: Object
    }
  },
  components: { ModalSearchWindow },
  setup(props) {
    const currentCurrency = ref('USD')
    const priceList = ref([])
    const currencyOptions = ['USD', 'EUR', 'BTC', 'ETH']
    const showPriceKeysInit = localStorage.getItem('showPriceKeys')?.split(',') || []
    const showPriceKeysBase = ['USD', 'EUR', 'UAH', 'BTC', 'ETH']
    const margeBaseInitPriceKeys = [...showPriceKeysBase, ...showPriceKeysInit]
    const showPriceKeys = ref([...new Set(margeBaseInitPriceKeys)])

    watch(props.data, recountPriceList)
    watch(showPriceKeys, () => recountPriceList(props.data))
    watch(currentCurrency, () => recountPriceList(props.data))

    function countPriceCurrency(key, currencyData) {
      const valueInUSD = 1 / currencyData.value[currentCurrency.value]
      return valueInUSD * currencyData.value[key] || 0
    }

    function recountPriceList(newData) {
      priceList.value = showPriceKeys.value.map((key) => ({
        price: countPriceCurrency(key, newData),
        key
      }))
    }

    return { currencyOptions, currentCurrency, priceList, showPriceKeys }
  }
}
</script>

<template>
  <div class="content-wrapper">
    <select v-model="currentCurrency">
      <option v-for="item in currencyOptions" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
  <div v-for="item in priceList" :key="item.key" class="content-wrapper">
    {{ item.key }} - {{ item.price }}
  </div>
  <ModalSearchWindow v-model:showPriceKeys="showPriceKeys" />
</template>

<style scoped></style>
