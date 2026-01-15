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

            <button
                @click="openPrintPreview"
                class="print-button"
                title="打印/导出 PDF"
            >
                <span class="icon">📄</span>
                <span v-if="!toggled" class="text">打印</span>
            </button>
        </div>

        <!-- Footer -->
        <NavSidebarFooter :shrink="toggled"
                          :credits="localize(profile.locales, 'credits')"/>
    </nav>
</template>

<script setup>
import {inject, watch} from "vue"
import NavProfileCard from "/src/vue/components/navigation/layout/NavProfileCard.vue"
import NavSidebarLinkList from "/src/vue/components/navigation/sidebar/NavSidebarLinkList.vue"
import NavSidebarFooter from "/src/vue/components/navigation/sidebar/NavSidebarFooter.vue"
import {useUtils} from "/src/composables/utils.js"

const utils = useUtils()

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

const openPrintPreview = inject('openPrintPreview')
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
    background-color: $nav-background;

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

.print-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 16px;
    margin: 16px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;

    &:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-2px);
    }

    .icon {
        font-size: 18px;
    }

    .text {
        font-weight: 500;
    }
}

nav.nav-sidebar-svh {
    height: 100vh!important;
    div.nav-sidebar-content {
        height: calc(100vh - $nav-sidebar-footer-height);
        height: calc(100svh - $nav-sidebar-footer-height);
    }
}
</style>