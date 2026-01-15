import { ref, watch, onMounted } from 'vue'
import { THEME_MODES, THEME_STORAGE_KEY, getTheme, getSystemTheme, LIGHT_THEME, DARK_THEME } from './theme.js'

export function useTheme() {
  const currentMode = ref(THEME_MODES.LIGHT)
  const isDark = ref(false)
  const isTransitioning = ref(false)

  const applyTheme = (mode, withTransition = true) => {
    if (withTransition) {
      isTransitioning.value = true
      setTimeout(() => {
        isTransitioning.value = false
      }, 300)
    }

    const theme = getTheme(mode)
    isDark.value = theme.name === 'dark'

    const root = document.documentElement
    const colors = theme.colors

    root.style.setProperty('--theme-background', colors.background)
    root.style.setProperty('--theme-text', colors.text)
    root.style.setProperty('--theme-card', colors.card)
    root.style.setProperty('--theme-border', colors.border)
    root.style.setProperty('--theme-primary', colors.primary)
    root.style.setProperty('--theme-secondary', colors.secondary)
    root.style.setProperty('--theme-nav-background', colors.navBackground)
    root.style.setProperty('--theme-nav-text', colors.navText)
    root.style.setProperty('--theme-progress-background', colors.progressBackground)
    root.style.setProperty('--theme-progress-border', colors.progressBorder)
    root.style.setProperty('--theme-shadow', colors.shadow)
    root.style.setProperty('--theme-hover', colors.hover)

    root.setAttribute('data-theme', theme.name)
  }

  const setTheme = (mode) => {
    currentMode.value = mode
    localStorage.setItem(THEME_STORAGE_KEY, mode)
    applyTheme(mode)
  }

  const toggleTheme = () => {
    const modes = Object.values(THEME_MODES)
    const currentIndex = modes.indexOf(currentMode.value)
    const nextIndex = (currentIndex + 1) % modes.length
    setTheme(modes[nextIndex])
  }

  const initTheme = () => {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY)
    const mode = savedMode && Object.values(THEME_MODES).includes(savedMode)
      ? savedMode
      : THEME_MODES.LIGHT
    currentMode.value = mode
    applyTheme(mode, false)
  }

  const getThemeIcon = () => {
    if (currentMode.value === THEME_MODES.AUTO) {
      return 'auto'
    }
    return isDark.value ? 'dark' : 'light'
  }

  const getThemeLabel = () => {
    const labels = {
      [THEME_MODES.LIGHT]: '浅色',
      [THEME_MODES.DARK]: '深色',
      [THEME_MODES.AUTO]: '自动'
    }
    return labels[currentMode.value]
  }

  const getCurrentTheme = () => {
    return getTheme(currentMode.value)
  }

  onMounted(() => {
    initTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (currentMode.value === THEME_MODES.AUTO) {
        applyTheme(THEME_MODES.AUTO)
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  })

  watch(currentMode, (newMode) => {
    localStorage.setItem(THEME_STORAGE_KEY, newMode)
  })

  return {
    currentMode,
    isDark,
    isTransitioning,
    setTheme,
    toggleTheme,
    getThemeIcon,
    getThemeLabel,
    getCurrentTheme,
    applyTheme,
    THEME_MODES
  }
}
