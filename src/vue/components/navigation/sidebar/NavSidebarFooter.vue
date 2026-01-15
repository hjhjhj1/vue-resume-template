<template>
    <div class="nav-sidebar-footer">
        <div class="nav-sidebar-footer-language-picker-wrapper">
            <LanguagePicker :shrink="shrink"/>
        </div>
        <div v-if="!shrink"
             class="nav-sidebar-footer-credits">
            <span v-html="credits"/>
        </div>
        <button class="nav-sidebar-footer-print-btn" @click="$emit('print')" v-if="!shrink">
            <i class="fas fa-print"></i>
            <span class="print-btn-text">打印</span>
        </button>
    </div>
</template>

<script setup>
import LanguagePicker from "/src/vue/components/widgets/LanguagePicker.vue"

defineProps({
    credits: String,
    shrink: Boolean
})

defineEmits(['print'])
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

.nav-sidebar-footer-print-btn {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.2s, transform 0.1s;

    &:hover {
        background-color: darken($primary, 10%);
    }

    &:active {
        transform: scale(0.98);
    }

    @media (max-height: $nav-sidebar-footer-compress-screen-height) {
        padding: 6px 12px;
        font-size: 0.85rem;
    }
}

.print-btn-text {
    font-weight: 500;
}
</style>