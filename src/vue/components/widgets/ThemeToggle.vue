<template>
    <button class="theme-toggle-btn"
            :title="`当前主题: ${themeDisplayText} (点击切换)`"
            @click="toggleTheme">
        <i v-if="currentTheme === ThemeMode.LIGHT" class="fa-solid fa-sun theme-icon"/>
        <i v-else-if="currentTheme === ThemeMode.DARK" class="fa-solid fa-moon theme-icon"/>
        <i v-else class="fa-solid fa-circle-half-stroke theme-icon"/>
    </button>
</template>

<script setup>
import { useTheme, ThemeMode } from "/src/composables/theme.js"

const { currentTheme, themeDisplayText, toggleTheme } = useTheme()
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.theme-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    color: var(--theme-text-light, $nav-contrast);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.95);
    }
}

.theme-icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
}

.theme-toggle-btn:hover .theme-icon {
    transform: rotate(15deg);
}
</style>
