<template>
    <slot/>
</template>

<script setup>
import { onMounted } from "vue"
import { useTheme } from "/src/composables/theme.js"

const { initTheme } = useTheme()

onMounted(() => {
    initTheme()
})
</script>
