<script>
import { ref, computed, toRef } from 'vue'

export default {
  props: {
    showPriceKeys: {
      type: Array
    }
  },
  emits: ['update:showPriceKeys'],
  setup(props, { emit }) {
    const showPriceKeys = toRef(props, 'showPriceKeys')
    const currencyFullList = ['USD', 'EUR', 'BTC', 'UAH', 'GBP', 'ETH', 'BNB', 'XRP']

    const showModal = ref(false)
    const symbol = ref('')
    const isDisabledButton = computed(() => {
      return !currencyFullList.includes(symbol.value.toUpperCase())
    })

    function modalToggle(value) {
      showModal.value = value
    }

    function addNewSymbol() {
      const newSymbolArray = new Set([...showPriceKeys.value, symbol.value.toUpperCase()])
      emit('update:showPriceKeys', [...newSymbolArray])
      localStorage.setItem('showPriceKeys', [...newSymbolArray].join(','))
      modalToggle(false)
    }

    return { showModal, modalToggle, symbol, currencyFullList, isDisabledButton, addNewSymbol }
  }
}
</script>

<template>
  <button class="default-button" @click="() => modalToggle(true)">Show Modal</button>
  <teleport to="body">
    <div v-if="showModal" class="modal-window-bg">
      <div class="modal-window">
        <input
          v-model.trim="symbol"
          class="default-input black-input"
          placeholder="Enter Symbol"
          type="text"
        />
        <div class="content-block">
          <div class="chips">
            <div
              v-for="item in currencyFullList"
              :key="item"
              :class="{ 'active-chip': item.toLowerCase() === symbol.toLowerCase() }"
              class="chip"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <button
          :disabled="isDisabledButton"
          @click="addNewSymbol"
          class="default-button black-button"
        >
          Add Symbol
        </button>
        <button class="default-button black-button" @click="modalToggle(false)">Close Modal</button>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
@import '../assets/variable.scss';
.modal-window {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-radius: $default-border-radius;
  border: solid 1px $black;
}
.modal-window-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $default-element-padding;
  top: 0;
  position: fixed;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  overflow: hidden;
}
.chips {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  flex-flow: wrap;
}
.chip {
  box-sizing: border-box;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: $default-border-radius;
  border: solid 1px $black;
  padding: 5px 10px;
  color: $black;
}
.active-chip {
  border: solid 2px orange;
  color: orange;
}
</style>
