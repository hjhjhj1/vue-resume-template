/**
 * 主题管理器 - 支持深色/浅色/自动模式切换
 * 主题选择持久化到 localStorage，并在页面加载时应用
 */
import { ref, computed, watch } from "vue"

const THEME_STORAGE_KEY = "resume-theme"

export const ThemeMode = {
    LIGHT: "light",
    DARK: "dark",
    AUTO: "auto"
}

const currentTheme = ref(ThemeMode.AUTO)
const systemPrefersDark = ref(false)

export function useTheme() {
    /**
     * 检测系统主题偏好
     * @returns {boolean}
     */
    const getSystemPrefersDark = () => {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    }

    /**
     * 从 localStorage 加载主题设置
     */
    const loadThemeFromStorage = () => {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
            if (savedTheme && Object.values(ThemeMode).includes(savedTheme)) {
                currentTheme.value = savedTheme
            }
        } catch (e) {
            console.warn("Failed to load theme from localStorage:", e)
        }
    }

    /**
     * 保存主题设置到 localStorage
     * @param {string} theme
     */
    const saveThemeToStorage = (theme) => {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme)
        } catch (e) {
            console.warn("Failed to save theme to localStorage:", e)
        }
    }

    /**
     * 应用主题到文档
     * @param {string} theme
     */
    const applyTheme = (theme) => {
        const html = document.documentElement
        const isDark = theme === ThemeMode.DARK || 
            (theme === ThemeMode.AUTO && systemPrefersDark.value)
        
        if (isDark) {
            html.setAttribute("data-theme", "dark")
        } else {
            html.setAttribute("data-theme", "light")
        }
    }

    /**
     * 设置主题
     * @param {string} theme
     */
    const setTheme = (theme) => {
        if (!Object.values(ThemeMode).includes(theme)) {
            console.warn("Invalid theme:", theme)
            return
        }
        currentTheme.value = theme
        saveThemeToStorage(theme)
        applyTheme(theme)
    }

    /**
     * 切换到下一个主题
     */
    const toggleTheme = () => {
        const themes = [ThemeMode.LIGHT, ThemeMode.DARK, ThemeMode.AUTO]
        const currentIndex = themes.indexOf(currentTheme.value)
        const nextIndex = (currentIndex + 1) % themes.length
        setTheme(themes[nextIndex])
    }

    /**
     * 监听系统主题变化
     */
    const setupSystemThemeListener = () => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        
        const handleChange = (e) => {
            systemPrefersDark.value = e.matches
            if (currentTheme.value === ThemeMode.AUTO) {
                applyTheme(currentTheme.value)
            }
        }
        
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleChange)
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(handleChange)
        }
        
        systemPrefersDark.value = mediaQuery.matches
    }

    /**
     * 初始化主题系统
     */
    const initTheme = () => {
        systemPrefersDark.value = getSystemPrefersDark()
        loadThemeFromStorage()
        applyTheme(currentTheme.value)
        setupSystemThemeListener()
    }

    /**
     * 当前是否为深色模式（计算属性）
     */
    const isDarkMode = computed(() => {
        return currentTheme.value === ThemeMode.DARK || 
            (currentTheme.value === ThemeMode.AUTO && systemPrefersDark.value)
    })

    /**
     * 获取当前主题显示文本
     */
    const themeDisplayText = computed(() => {
        switch (currentTheme.value) {
            case ThemeMode.LIGHT:
                return "浅色"
            case ThemeMode.DARK:
                return "深色"
            case ThemeMode.AUTO:
                return "自动"
            default:
                return "自动"
        }
    })

    return {
        currentTheme,
        isDarkMode,
        themeDisplayText,
        ThemeMode,
        setTheme,
        toggleTheme,
        initTheme,
        applyTheme
    }
}
