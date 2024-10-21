<script setup lang="ts">
const selected = ref(false);
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "light";
  },
  set(value) {
    colorMode.preference = value ? "light" : "dark";
  },
});

watch(selected, () => {
  isDark.value = !isDark.value;
});
</script>

<template>
  <UToggle v-model="selected" />
</template>