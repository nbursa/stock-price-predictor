<template>
  <div class="flex items-center justify-center">
    <label
      class="inline-flex items-center justify-between gap-4 w-full cursor-pointer"
    >
      <span v-if="label" class="text-sm font-medium">{{ label }}</span>
      <div class="relative">
        <input type="checkbox" v-model="isChecked" class="sr-only peer" />
        <div
          class="w-11 h-6 !bg-gray-100 dark:!bg-gray-300 peer-focus:outline-none rounded-full peer-checked:border-0 peer-checked:bg-custom-blue after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-custom-blue peer-checked:after:bg-custom-blue"
        ></div>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SwitchCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isChecked = ref(props.modelValue)

    const toggleSwitch = () => {
      emit('update:modelValue', isChecked.value)
    }

    return {
      isChecked,
      toggleSwitch,
    }
  },
  watch: {
    modelValue(newValue) {
      this.isChecked = newValue
    },
    isChecked(newValue) {
      this.toggleSwitch()
    },
  },
})
</script>
