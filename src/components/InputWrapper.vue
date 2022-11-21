<script lang="ts">
import { defineComponent, useSlots, computed } from 'vue';

export default defineComponent({
  props: {
    isFocused: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    const slots = useSlots();
    const autoClass = computed(() => {
      const vuetifyNormal = "v-field v-field--no-label v-field--variant-filled v-theme--myCustomLightTheme";
      const focusedCase = props.isFocused? 'v-field--active v-field--focused': '';
      const slotCase =  hasSlot('appendInner')? 'v-field--appended' : ''; 
      return `${vuetifyNormal} ${focusedCase} ${slotCase}`;
    })

    function  hasSlot(name: string) {
      return !!slots[name];
    }
    return {
      hasSlot, autoClass
    };
  }
});

</script>
<template>
  <div class="v-input v-input--horizontal v-input--density-compact v-text-field">
    <div class="v-input__control">
      <div        
        :class="autoClass"
      >
        <div class="v-field__overlay"></div>
        <div class="v-field__field">
          <label class="v-label v-field-label"></label>
          <slot></slot>
        </div>
        <div v-if="hasSlot('appendInner')" class="v-field__append-inner">
          <slot name="appendInner"></slot>
        </div>
        <div class="v-field__outline"></div>
      </div>
    </div>
  </div>
</template>