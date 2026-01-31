<template>
    <slot/>

    <ProjectModal :item="projectModalTargetItem"
                  @close="_onProjectModalClosed"/>

    <PrintPreviewModal :visible="printPreviewVisible"
                       @close="_onPrintPreviewClosed"/>
</template>

<script setup>
import ProjectModal from "/src/vue/components/modals/project/ProjectModal.vue"
import PrintPreviewModal from "/src/vue/components/modals/print/PrintPreviewModal.vue"
import {provide, ref} from "vue"

const projectModalTargetItem = ref(null)
const printPreviewVisible = ref(false)

const showProjectModal = (articleItem) => {
    projectModalTargetItem.value = articleItem
}

const showPrintPreviewModal = () => {
    printPreviewVisible.value = true
}

const _onProjectModalClosed = () => {
    projectModalTargetItem.value = null
}

const _onPrintPreviewClosed = () => {
    printPreviewVisible.value = false
}

provide("showProjectModal", showProjectModal)
provide("showPrintPreviewModal", showPrintPreviewModal)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>