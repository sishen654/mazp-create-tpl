import { createPinia, defineStore } from 'pinia'
import { ref, computed } from "vue"

const pinia = createPinia()

export const useStore = defineStore("store", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  return { count, doubleCount, increment };
});

export default pinia
