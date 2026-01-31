<template>
    <div v-if="didLoadAllJsonFiles" id="resume">
        <NavigationWrapper>
            <Section v-for="section in sections"
                     :presentation-mode="String(presentationMode)"
                     :model="section"
                     :active="_isSectionActive(section)"/>
        </NavigationWrapper>
        <div class="print-button-container no-print">
            <button class="print-button" @click="_onPrintPreview">
                <span class="print-button-icon">
                    <i class="fa-solid fa-print"></i>
                </span>
                <span class="print-button-text">打印 / 导出 PDF</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import {inject, onMounted} from "vue"
import Section from "/src/vue/components/sections/Section.vue"
import NavigationWrapper from "/src/vue/components/navigation/NavigationWrapper.vue"
import {useUtils} from "/src/composables/utils.js"
import {usePrint} from "/src/composables/print.js"

const utils = useUtils()
const {openPrintPreview} = usePrint()

/** @type {{value: Boolean}} */
const didLoadAllJsonFiles = inject("didLoadAllJsonFiles")

/** @type {{value: String}} */
const presentationMode = inject("presentationMode")

/** @type {{value: Section[]}} */
const sections = inject("sections")

/** @type {{value: Section}} */
const currentSection = inject("currentSection")

/**
 * @description This hook can be used to report a visit to an external analytics service.
 * Here, you can integrate Google Analytics, Mixpanel, or your own custom analytics implementation.
 */
onMounted(() => {
    fetch("https://admin.ryanbalieiro.com/api/analytics/mock", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            params: {
                url: utils.getRootLocation(),
                template_id: "vue-resume"
            }
        })
    })
})

const _isSectionActive = (section) => {
    if(!currentSection.value)
        return false
    return currentSection.value.id === section.id
}

const _onPrintPreview = () => {
    openPrintPreview()
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

#resume {
    display: flex;
    min-height: 100vh;
    background-color: $nav-background;
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        background-color: $default-section-background;
    }
}

.print-button-container {
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index: 1000;

    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        bottom: 90px;
        right: 15px;
    }
}

.print-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    }

    &:active {
        transform: translateY(0);
    }

    .print-button-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
    }

    .print-button-text {
        white-space: nowrap;
    }

    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        padding: 10px 16px;
        font-size: 13px;

        .print-button-text {
            display: none;
        }
    }
}
</style>