<template>
    <button class="theme-toggle"
            @click="handleToggle"
            :title="isDark ? '切换到浅色模式' : '切换到深色模式'">
        <div class="theme-toggle-track">
            <div class="theme-toggle-thumb">
                <span class="theme-toggle-icon">
                    <i v-if="isDark" class="fas fa-moon"></i>
                    <i v-else class="fas fa-sun"></i>
                </span>
            </div>
        </div>
    </button>
</template>

<script setup>
import { computed } from "vue"
import { useTheme } from "/src/composables/theme.js"

const { theme, toggleTheme, THEMES } = useTheme()

const isDark = computed(() => theme.value === THEMES.DARK)

function handleToggle() {
    toggleTheme()
}
</script>

<style lang="scss" scoped>
.theme-toggle {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;

    &-track {
        width: 48px;
        height: 26px;
        border-radius: 13px;
        background: var(--theme-bg-tertiary, #e9ecef);
        position: relative;
        transition: background-color 0.3s ease;
        border: 2px solid var(--theme-border-color, #dee2e6);

        .theme-dark & {
            background: var(--theme-bg-tertiary, #2a2a2a);
        }
    }

    &-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--primary, #7e45dc);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        .theme-dark & {
            transform: translateX(22px);
        }
    }

    &-icon {
        color: #fff;
        font-size: 10px;
        transition: transform 0.3s ease, opacity 0.3s ease;

        .theme-dark & {
            transform: rotate(360deg);
        }
    }

    &:hover &-track {
        border-color: var(--primary, #7e45dc);
    }

    &:hover &-thumb {
        transform: scale(1.1);

        .theme-dark & {
            transform: translateX(22px) scale(1.1);
        }
    }

    &:focus-visible &-track {
        outline: 2px solid var(--primary, #7e45dc);
        outline-offset: 2px;
    }
}
</style>
