<template>
    <div class="progress-bar-wrapper" :class="props.class">
        <div class="progress">
            <div class="progress-bar"
                 role="progressbar"
                 :style="style"
                 :aria-valuenow="parsedPercentage"
                 aria-valuemin="0"
                 aria-valuemax="100"/>
        </div>
    </div>
</template>

<script setup>
import {useUtils} from "/src/composables/utils.js"
import {computed} from "vue"

const utils = useUtils()

const props = defineProps({
    class: String,
    percentage: Number
})

const parsedPercentage = computed(() => {
    return utils.clamp(props.percentage, 0, 100)
})

const style = computed(() => {
    const percentageValue = parsedPercentage.value
    const opacity = (50 + percentageValue*0.5)/100
    return `width: ${percentageValue}%; opacity: ${opacity}`
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.progress {
    height: 5px;
    border-radius: $default-border-radius;
    background-color: var(--theme-progress-bg, lighten($light-3, 2%));
}

div.progress-bar {
    background-color: var(--theme-primary, $primary);
    // 禁用过渡动画，避免影响技能进度条的颜色计算
    -webkit-transition: width 0.3s ease;
    -moz-transition: width 0.3s ease;
    -ms-transition: width 0.3s ease;
    -o-transition: width 0.3s ease;
    transition: width 0.3s ease;
}
</style>