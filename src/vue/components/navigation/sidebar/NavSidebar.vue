<template>
    <nav class="nav-sidebar" :class="{'nav-sidebar-shrink': toggled, 'nav-sidebar-svh': utils.isIOS()}">
        <!-- Main Content -->
        <div class="nav-sidebar-content">
            <NavProfileCard :avatar="profile.profilePictureUrl"
                            :name="localize(profile.locales, 'name', true) || profile.name"
                            :role="localize(profile.locales, 'role')"
                            :shrink="toggled"
                            :include-toggle-button="settings.navToggleEnabled"
                            @toggle="_onToggle"/>

            <NavSidebarLinkList :sections="sections"
                                :current-section="highlightedSection"
                                :shrink="toggled"
                                @link-clicked="_onLinkClicked"/>

            <button class="theme-toggle-btn" @click="_onToggleTheme" :title="localizeFromStrings('toggle_theme')">
                <i :class="isDarkMode ? 'fa-regular fa-sun' : 'fa-regular fa-moon'"></i>
            </button>
        </div>

        <!-- Footer -->
        <NavSidebarFooter :shrink="toggled"
                          :credits="localize(profile.locales, 'credits')"/>
    </nav>
</template>

<script setup>
import {inject, watch, ref, computed} from "vue"
import NavProfileCard from "/src/vue/components/navigation/layout/NavProfileCard.vue"
import NavSidebarLinkList from "/src/vue/components/navigation/sidebar/NavSidebarLinkList.vue"
import NavSidebarFooter from "/src/vue/components/navigation/sidebar/NavSidebarFooter.vue"
import {useUtils} from "/src/composables/utils.js"
import {useTheme} from "/src/composables/theme.js"

const utils = useUtils()
const { currentTheme, toggleTheme } = useTheme()

const isDarkMode = computed(() => currentTheme.value === 'dark')

const _onToggleTheme = () => {
    toggleTheme()
}

const props = defineProps({
    toggled: Boolean,
    highlightedSection: Object
})

const emit = defineEmits(['toggle', 'select'])

/** @type {{value: Profile}} */
const profile = inject("profile")

/** @type {{value:Settings}} */
const settings = inject("settings")

/** @type {{value: Section[]}} */
const sections = inject("sections")

/** @type {Function} */
const localize = inject("localize")

/** @type {{value: Object}} */
const lastKeyPressed = inject("lastKeyPressed")

/** @type {{value: Object}} */
const localizeFromStrings = inject("localizeFromStrings")

watch(() => lastKeyPressed.value, () => {
    if(!settings.value.navToggleEnabled)
        return

    if(lastKeyPressed.value.id === "ArrowLeft")
        emit('toggle', true)
    else if(lastKeyPressed.value.id === "ArrowRight")
        emit('toggle', false)
})

const _onLinkClicked = (section) => {
    emit('select', section)
}

const _onToggle = () => {
    emit('toggle', !props.toggled)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

nav.nav-sidebar {
    position: fixed;
    display: flex;
    flex-direction: column;

    height: 100vh;
    height: 100dvh;
    min-width: $nav-sidebar-width;
    width: $nav-sidebar-width;
    z-index: $z-index-sidebar;
    background-color: var(--theme-bg-nav);

    @include media-breakpoint-down(xl) {
        min-width: $nav-sidebar-width-lg;
        width: $nav-sidebar-width-lg;
    }

    &-shrink {
        min-width: $nav-sidebar-width-shrink;
        width: $nav-sidebar-width-shrink;
    }
}

div.nav-sidebar-content {
    display: flex;
    flex-direction: column;
    height: calc(100% - $nav-sidebar-footer-height);
    align-items: center;
    justify-content: center;
    @media (max-height: $nav-sidebar-footer-compress-screen-height) {
        height: calc(100% - $nav-sidebar-footer-height-compressed);
    }
}

nav.nav-sidebar-svh {
    height: 100vh!important;
    div.nav-sidebar-content {
        height: calc(100vh - $nav-sidebar-footer-height);
        height: calc(100svh - $nav-sidebar-footer-height);
    }
}

button.theme-toggle-btn {
    position: absolute;
    bottom: $nav-sidebar-footer-height + 20px;
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    border: none;
    color: var(--theme-text-primary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(-50%) scale(1.1);
    }

    i {
        transition: transform 0.3s ease;
    }
}
</style>