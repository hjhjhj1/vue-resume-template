<template>
    <div class="print-button-wrapper">
        <button
            class="print-main-button"
            :class="variantClass"
            :title="localizeFromStrings('print_resume')"
            @click="_onMainClick">
            <i class="fa-solid fa-print"/>
            <span v-if="showLabel" class="print-button-label">{{ localizeFromStrings('print') }}</span>
        </button>

        <div v-if="showDropdown" class="print-dropdown">
            <button
                class="print-dropdown-item"
                @click="_onPrintDirect">
                <i class="fa-solid fa-print me-2"/>
                {{ localizeFromStrings('print_direct') }}
            </button>
            <button
                class="print-dropdown-item"
                @click="_onOpenPreview">
                <i class="fa-solid fa-eye me-2"/>
                {{ localizeFromStrings('print_preview') }}
            </button>
            <button
                class="print-dropdown-item"
                @click="_onExportPDF">
                <i class="fa-solid fa-file-pdf me-2"/>
                {{ localizeFromStrings('export_pdf') }}
            </button>
        </div>
    </div>

    <PrintPreviewModal
        :visible="isPreviewOpen"
        @close="_onClosePreview"
        @print="_onPrintFromPreview"
        @export="_onExportFromPreview"/>
</template>

<script setup>
import {computed, inject, ref} from "vue"
import PrintPreviewModal from "/src/vue/components/modals/print/PrintPreviewModal.vue"

const props = defineProps({
    variant: {
        type: String,
        default: 'primary'
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    showDropdown: {
        type: Boolean,
        default: true
    }
})

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

const isPreviewOpen = ref(false)

const variantClass = computed(() => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline-primary',
        transparent: 'btn-transparent'
    }
    return variants[props.variant] || 'btn-primary'
})

const _onMainClick = () => {
    // Always open preview modal when clicking the main button
    _onOpenPreview()
}

const _onPrintDirect = () => {
    // Add print mode class to body
    document.body.classList.add('print-mode')

    // Wait for styles to apply then print
    setTimeout(() => {
        window.print()
        document.body.classList.remove('print-mode')
    }, 100)
}

const _onOpenPreview = () => {
    isPreviewOpen.value = true
}

const _onClosePreview = () => {
    isPreviewOpen.value = false
}

const _onPrintFromPreview = () => {
    _onPrintDirect()
}

const _onExportFromPreview = () => {
    // PDF export uses the same print dialog
    // Users can select "Save as PDF" in the print dialog
    _onPrintDirect()
}

const _onExportPDF = () => {
    _onOpenPreview()
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.print-button-wrapper {
    position: relative;
    display: inline-block;
}

.print-main-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    cursor: pointer;

    i {
        font-size: 1rem;
    }

    &.btn-primary {
        background-color: $primary;
        color: white;
        border-color: $primary;

        &:hover {
            background-color: darken($primary, 10%);
            border-color: darken($primary, 10%);
        }
    }

    &.btn-secondary {
        background-color: $secondary;
        color: white;
        border-color: $secondary;

        &:hover {
            background-color: darken($secondary, 10%);
            border-color: darken($secondary, 10%);
        }
    }

    &.btn-outline-primary {
        background-color: transparent;
        color: $primary;
        border-color: $primary;

        &:hover {
            background-color: $primary;
            color: white;
        }
    }

    &.btn-transparent {
        background-color: transparent;
        color: $nav-contrast-70;
        border-color: transparent;

        &:hover {
            color: $nav-highlight;
            background-color: rgba($nav-highlight, 0.1);
        }
    }
}

.print-button-label {
    font-size: 0.9rem;
}

.print-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-width: 180px;
    z-index: 1000;
    overflow: hidden;
}

.print-dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: transparent;
    color: $dark;
    font-size: 0.9rem;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease;

    i {
        width: 1.25rem;
        text-align: center;
        color: $primary;
    }

    &:hover {
        background-color: $light-2;
    }

    &:first-child {
        border-radius: 0.5rem 0.5rem 0 0;
    }

    &:last-child {
        border-radius: 0 0 0.5rem 0.5rem;
    }
}

/* Hide in print mode */
@media print {
    .print-button-wrapper {
        display: none !important;
    }
}
</style>
