<template>
    <nav class="nav-mobile-header"
         id="nav-mobile-header">
        <NavProfileCard :avatar="profile.profilePictureUrl"
                        :name="localize(profile.locales, 'name', true) || profile.name"
                        :role="localize(profile.locales, 'role')"
                        :shrink="false"
                        :include-toggle-button="false"
                        @toggle="null"/>

        <LanguagePicker :shrink="true"
                        :class="utils.isChromeOS() ? `language-picker-left` : `language-picker-right`"/>

        <button class="nav-mobile-header-theme-toggle"
                @click="toggleTheme">
            <span v-if="currentTheme === 'light'">🌙</span>
            <span v-else>☀️</span>
        </button>
    </nav>
</template>

<script setup>
import {inject} from "vue"
import NavProfileCard from "/src/vue/components/navigation/layout/NavProfileCard.vue"
import LanguagePicker from "/src/vue/components/widgets/LanguagePicker.vue"
import {useUtils} from "/src/composables/utils.js"
import {useTheme} from "/src/composables/useTheme.js"

const utils = useUtils()

/** @type {{value: Profile}} */
const profile = inject("profile")

/** @type {Function} */
const localize = inject("localize")

const { currentTheme, toggleTheme } = useTheme()
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

nav.nav-mobile-header {
    background-color: $nav-background;
    @include media-breakpoint-up($navigation-sidebar-breakpoint) {
        display: none;
    }

    position: relative;
}

div.language-picker {
    position: absolute;
    top: 5px;
    right: 5px;

    &-left {
        left: 5px;
        right: auto;
    }
}

button.nav-mobile-header-theme-toggle {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px 10px;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateX(-50%) scale(1.1);
    }
}
</style>