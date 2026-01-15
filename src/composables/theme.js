export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
}

export const THEME_STORAGE_KEY = 'resume-theme-mode'

export const LIGHT_THEME = {
  name: 'light',
  colors: {
    background: '#f1eff3',
    text: '#140f29',
    card: '#ffffff',
    border: '#dee2e6',
    primary: '#7e45dc',
    secondary: '#6c757d',
    navBackground: '#140f29',
    navText: '#fcfcfc',
    progressBackground: 'rgba(33, 37, 41, 0.05)',
    progressBorder: 'rgba(0, 0, 0, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.1)',
    hover: 'rgba(0, 0, 0, 0.05)'
  }
}

export const DARK_THEME = {
  name: 'dark',
  colors: {
    background: '#1a1a2e',
    text: '#e8e8e8',
    card: '#16213e',
    border: '#2a2a4a',
    primary: '#9d7ae8',
    secondary: '#8b9bb4',
    navBackground: '#0f0f1a',
    navText: '#e8e8e8',
    progressBackground: 'rgba(255, 255, 255, 0.1)',
    progressBorder: 'rgba(255, 255, 255, 0.2)',
    shadow: 'rgba(0, 0, 0, 0.3)',
    hover: 'rgba(255, 255, 255, 0.1)'
  }
}

export function getTheme(mode) {
  if (mode === THEME_MODES.AUTO) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? DARK_THEME : LIGHT_THEME
  }
  return mode === THEME_MODES.DARK ? DARK_THEME : LIGHT_THEME
}

export function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_MODES.DARK : THEME_MODES.LIGHT
}
