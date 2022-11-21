<template>
  <input ref="inputRef" type="text" />
</template>

<script lang="ts">
import { PropType } from 'vue'
import { CurrencyInputOptions, useCurrencyInput } from "vue-currency-input";
export default {
  name: "CurrencyInput",
  props: {
    modelValue: Number,
    options: {
      type: Object as PropType<CurrencyInputOptions>,
      required: true
    }
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);
    return { inputRef };
  },
};
</script>