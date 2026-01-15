import { ref, onMounted, watch } from 'vue'

const STORAGE_KEY = 'resume-theme'

export function useTheme() {
    const currentTheme = ref('light')

    const setTheme = (theme) => {
        currentTheme.value = theme
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem(STORAGE_KEY, theme)
    }

    const toggleTheme = () => {
        const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    onMounted(() => {
        const savedTheme = localStorage.getItem(STORAGE_KEY)
        if (savedTheme) {
            setTheme(savedTheme)
        } else {
            setTheme('light')
        }
    })

    watch(currentTheme, (newTheme) => {
        setTheme(newTheme)
    })

    return {
        currentTheme,
        setTheme,
        toggleTheme
    }
}
