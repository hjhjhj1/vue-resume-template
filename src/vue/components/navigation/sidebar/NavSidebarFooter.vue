<template>
    <div class="nav-sidebar-footer">
        <div class="nav-sidebar-footer-language-picker-wrapper">
            <LanguagePicker :shrink="shrink"/>
        </div>
        <button class="nav-sidebar-footer-theme-toggle"
                @click="toggleTheme">
                <span v-if="currentTheme === 'light'">🌙</span>
                <span v-else>☀️</span>
            </button>
        <div v-if="!shrink"
             class="nav-sidebar-footer-credits">
            <span v-html="credits"/>
        </div>
    </div>
</template>

<script setup>
import LanguagePicker from "/src/vue/components/widgets/LanguagePicker.vue"
import { useTheme } from "/src/composables/useTheme.js"

const props = defineProps({
    credits: String,
    shrink: Boolean
})

const { currentTheme, toggleTheme } = useTheme()
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.nav-sidebar-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 20px;
    min-height: $nav-sidebar-footer-height;

    @media (max-height: $nav-sidebar-footer-compress-screen-height) {
        min-height: $nav-sidebar-footer-height-compressed;
        padding: 5px 5px;
    }
}

div.nav-sidebar-footer-language-picker-wrapper {
    padding-bottom: 5px;
    @media (max-height: 650px) {
        padding-bottom: 0;
    }
}

button.nav-sidebar-footer-theme-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px 10px;
    margin: 5px 0;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
}

div.nav-sidebar-footer-credits {
    width: 100%;
    text-align: center;
    color: $light-5;
    font-size: 0.9rem;

    @media (max-height: 650px) {
        font-size: 0.85rem;
    }

    @media (max-height: $nav-sidebar-footer-compress-screen-height) {
        display: none;
    }
}
</style>