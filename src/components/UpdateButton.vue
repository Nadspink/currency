<script>
import { ref, onUnmounted } from 'vue'

export default {
  emits: ['getPriceData'],
  setup(_, { emit }) {
    const disabled = ref(false)
    let timerId = null

    function onUpdateExchangeRates() {
      emit('getPriceData')
      disabled.value = true
      timerId = setTimeout(() => (disabled.value = false), 5000)
    }

    onUnmounted(() => {
      clearTimeout(timerId)
    })

    return {
      onUpdateExchangeRates,
      disabled
    }
  }
}
</script>

<template>
  <button class="default-button" @click="onUpdateExchangeRates" :disabled="disabled">Update</button>
</template>

<style scoped></style>
