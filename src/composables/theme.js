import { ref, watch } from "vue"

const THEME_STORAGE_KEY = "resume-theme"
const THEMES = {
    LIGHT: "light",
    DARK: "dark"
}

const currentTheme = ref(null)

function getStoredTheme() {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY)
        if (stored && Object.values(THEMES).includes(stored)) {
            return stored
        }
    } catch (e) {
        console.warn("Failed to read theme from localStorage", e)
    }
    return null
}

function getSystemTheme() {
    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? THEMES.DARK
            : THEMES.LIGHT
    }
    return THEMES.LIGHT
}

function applyTheme(theme) {
    const root = document.documentElement
    root.classList.remove("theme-light", "theme-dark")
    root.classList.add(`theme-${theme}`)
}

function storeTheme(theme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (e) {
        console.warn("Failed to store theme in localStorage", e)
    }
}

export function useTheme() {
    if (currentTheme.value === null) {
        const storedTheme = getStoredTheme()
        const initialTheme = storedTheme || getSystemTheme()
        currentTheme.value = initialTheme
        applyTheme(initialTheme)
    }

    watch(currentTheme, (newTheme) => {
        applyTheme(newTheme)
        storeTheme(newTheme)
    })

    function setTheme(theme) {
        if (Object.values(THEMES).includes(theme)) {
            currentTheme.value = theme
        }
    }

    function toggleTheme() {
        currentTheme.value = currentTheme.value === THEMES.DARK
            ? THEMES.LIGHT
            : THEMES.DARK
    }

    function isDark() {
        return currentTheme.value === THEMES.DARK
    }

    function isLight() {
        return currentTheme.value === THEMES.LIGHT
    }

    return {
        theme: currentTheme,
        THEMES,
        setTheme,
        toggleTheme,
        isDark,
        isLight
    }
}

export { THEMES }
