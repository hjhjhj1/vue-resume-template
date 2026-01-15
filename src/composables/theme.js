import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'theme-preference'
const html = document.documentElement

export function useTheme() {
    const currentTheme = ref(localStorage.getItem(STORAGE_KEY) || 'light')

    const setTheme = (theme) => {
        currentTheme.value = theme
        localStorage.setItem(STORAGE_KEY, theme)
        html.setAttribute('data-theme', theme)
    }

    const toggleTheme = () => {
        const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    onMounted(() => {
        html.setAttribute('data-theme', currentTheme.value)
    })

    return {
        currentTheme,
        setTheme,
        toggleTheme
    }
}
