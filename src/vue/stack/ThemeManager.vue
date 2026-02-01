<template>
    <slot/>
</template>

<script setup>
import { onMounted, provide } from 'vue'
import { useTheme } from '/src/composables/useTheme.js'

const {
  currentMode,
  isDark,
  setTheme,
  toggleTheme,
  getThemeLabel,
  getCurrentTheme,
  THEME_MODES,
  applyTheme
} = useTheme()

provide('theme', {
  currentMode,
  isDark,
  setTheme,
  toggleTheme,
  getThemeLabel,
  getCurrentTheme,
  THEME_MODES
})

onMounted(() => {
  const savedMode = localStorage.getItem('resume-theme-mode')
  if (savedMode && Object.values(THEME_MODES).includes(savedMode)) {
    currentMode.value = savedMode
    applyTheme(savedMode, false)
  } else {
    applyTheme(THEME_MODES.LIGHT, false)
  }
})
</script>
