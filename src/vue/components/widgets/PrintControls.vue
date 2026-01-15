<template>
    <div class="print-controls no-print">
        <button class="print-preview-button btn btn-outline-primary" @click="showPrintPreview">
            <i class="fas fa-eye me-2"></i> 打印预览
        </button>
        <button class="print-button btn btn-primary" @click="printDirect">
            <i class="fas fa-print me-2"></i> 打印 / 导出PDF
        </button>
    </div>
</template>

<script setup>
import {ref} from "vue"
import {usePrintPagination} from "/src/composables/printPagination.js"

const emit = defineEmits(['show-print-preview'])

const {getPrintContent} = usePrintPagination()

const showPrintPreview = () => {
    const content = getPrintContent()
    emit('show-print-preview', content)
}

const printDirect = () => {
    window.print()
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.print-controls {
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
    
    .print-preview-button,
    .print-button {
        min-width: 160px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        &:active {
            transform: translateY(0);
        }
    }
    
    .print-preview-button {
        background-color: white;
        border-color: $primary;
        color: $primary;
        
        &:hover {
            background-color: $primary;
            color: white;
        }
    }
    
    .print-button {
        background-color: $primary;
        border-color: $primary;
        color: white;
        
        &:hover {
            background-color: darken($primary, 10%);
            border-color: darken($primary, 10%);
        }
    }
}

@media (max-width: 768px) {
    .print-controls {
        bottom: 20px;
        right: 20px;
        
        .print-preview-button,
        .print-button {
            min-width: 140px;
            padding: 10px 16px;
            font-size: 13px;
        }
    }
}
</style>
