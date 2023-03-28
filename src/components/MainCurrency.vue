<script>
import { ref, watch } from 'vue'

export default {
  props: {
    currencyData: {
      type: Object
    }
  },
  setup(props) {
    const { currencyData } = props

    const currencyFullList = ['USD', 'EUR', 'BTC', 'UAH', 'GBP', 'ETH', 'BNB', 'XRP']
    const maxCurrencyValueUSD = 10000

    let initKey = ref('USD')
    let resultKey = ref('BTC')
    let skipInitWatch = false
    let skipResultWatch = false

    const initInputValue = ref(0)
    const resultInputValue = ref(0)

    const error = ref(false)

    watch(initInputValue, onInitValueChanged)
    watch(resultInputValue, onResultCountLogic)
    function onInitValueChanged(newValue, oldValue) {
      if (skipInitWatch) {
        skipInitWatch = false
        return null
      }

      error.value = false

      const valueInUSD = newValue / currencyData.value[initKey.value]
      const localResultValue = valueInUSD * currencyData.value[resultKey.value] || 0
      const resultValueInUSD = localResultValue / currencyData.value[resultKey.value]

      if (resultValueInUSD > maxCurrencyValueUSD) {
        initInputValue.value = oldValue || 0
        error.value = true
        skipInitWatch = true
        return null
      }

      skipResultWatch = true

      resultInputValue.value = localResultValue
    }
    function onResultCountLogic(newValue, oldValue) {
      if (skipResultWatch) {
        skipResultWatch = false
        return null
      }
      error.value = false
      const valueInUSD = newValue / currencyData.value[resultKey.value]
      const initValueLocal = valueInUSD / currencyData.value[initKey.value] || 0

      if (valueInUSD > maxCurrencyValueUSD) {
        resultInputValue.value = oldValue || 0
        skipResultWatch = true
        error.value = true
        return null
      }
      skipInitWatch = true
      initInputValue.value = initValueLocal
    }
    watch(initKey, reCountTotalPrice)
    watch(resultKey, reCountTotalPrice)

    function reCountTotalPrice() {
      skipInitWatch = true
      skipResultWatch = true
      resultInputValue.value = 0
      initInputValue.value = 0
    }

    return {
      initKey,
      resultKey,
      initInputValue,
      resultInputValue,
      currencyFullList,
      error
    }
  }
}
</script>

<template>
  <div class="content-wrapper">
    <select v-model="initKey">
      <option v-for="item in currencyFullList" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
  <div class="content-wrapper">
    <select v-model="resultKey">
      <option v-for="item in currencyFullList" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
  <input v-model="initInputValue" class="price-input" placeholder="Enter currency" type="number" />
  <input v-model="resultInputValue" class="price-input" placeholder="Enter result" type="number" />
  <div v-if="error" class="error-message">The amount is too big</div>
</template>
