<template>
    <div v-if="didLoadAllJsonFiles" id="resume">
        <NavigationWrapper>
            <Section v-for="section in sections"
                     :presentation-mode="String(presentationMode)"
                     :model="section"
                     :active="_isSectionActive(section)"/>
        </NavigationWrapper>
        <PrintControls @show-print-preview="onShowPrintPreview"/>
        <PrintPreviewModal :visible="printPreviewVisible"
                          :content="printPreviewContent"
                          @close="onClosePrintPreview"/>
    </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue"
import Section from "/src/vue/components/sections/Section.vue"
import NavigationWrapper from "/src/vue/components/navigation/NavigationWrapper.vue"
import PrintControls from "/src/vue/components/widgets/PrintControls.vue"
import PrintPreviewModal from "/src/vue/components/modals/print/PrintPreviewModal.vue"
import {useUtils} from "/src/composables/utils.js"

const utils = useUtils()

/** @type {{value: Boolean}} */
const didLoadAllJsonFiles = inject("didLoadAllJsonFiles")

/** @type {{value: String}} */
const presentationMode = inject("presentationMode")

/** @type {{value: Section[]}} */
const sections = inject("sections")

/** @type {{value: Section}} */
const currentSection = inject("currentSection")

const printPreviewVisible = ref(false)
const printPreviewContent = ref("")

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

const onShowPrintPreview = (content) => {
    printPreviewContent.value = content
    printPreviewVisible.value = true
}

const onClosePrintPreview = () => {
    printPreviewVisible.value = false
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
</style>