<template>
    <Modal
        :id="modalId"
        modal-type="print-preview-modal"
        dialog-type="modal-fullscreen"
        :visible="visible"
        :dismissable="true"
        @close="_onClose">
        <div class="print-preview-container">
            <!-- Header -->
            <div class="print-preview-header">
                <div class="print-preview-title">
                    <i class="fa-solid fa-print me-2"/>
                    <span>{{ localizeFromStrings('print_preview_title') }}</span>
                </div>
                <div class="print-preview-actions">
                    <button
                        class="btn btn-outline-secondary btn-sm me-2"
                        @click="_onRefresh">
                        <i class="fa-solid fa-refresh me-1"/>
                        {{ localizeFromStrings('refresh') }}
                    </button>
                    <button
                        class="btn btn-primary btn-sm me-2"
                        @click="_onPrint">
                        <i class="fa-solid fa-print me-1"/>
                        {{ localizeFromStrings('print') }}
                    </button>
                    <button
                        class="btn btn-success btn-sm me-2"
                        @click="_onExportPDF">
                        <i class="fa-solid fa-file-pdf me-1"/>
                        {{ localizeFromStrings('export_pdf') }}
                    </button>
                    <button
                        class="btn btn-outline-dark btn-sm"
                        @click="_onClose">
                        <i class="fa-solid fa-close me-1"/>
                        {{ localizeFromStrings('close') }}
                    </button>
                </div>
            </div>

            <!-- Preview Area -->
            <div class="print-preview-body">
                <div class="print-preview-toolbar">
                    <div class="print-preview-info">
                        <i class="fa-solid fa-info-circle me-1"/>
                        {{ localizeFromStrings('print_preview_info') }}
                    </div>
                    <div class="print-preview-scale">
                        <label class="me-2">{{ localizeFromStrings('scale') }}:</label>
                        <select
                            v-model="scale"
                            class="form-select form-select-sm"
                            style="width: auto; display: inline-block;">
                            <option value="0.5">50%</option>
                            <option value="0.75">75%</option>
                            <option value="1">100%</option>
                            <option value="1.25">125%</option>
                            <option value="1.5">150%</option>
                        </select>
                    </div>
                </div>
                <div class="print-preview-frame-container">
                    <iframe
                        ref="previewFrame"
                        class="print-preview-iframe"
                        :style="iframeStyle"
                        sandbox="allow-same-origin allow-scripts"
                        @load="_onFrameLoad"/>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import {computed, inject, nextTick, ref, watch} from "vue"
import Modal from "/src/vue/components/modals/base/Modal.vue"

const props = defineProps({
    visible: Boolean
})

const emit = defineEmits(['close', 'print', 'export'])

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

const modalId = 'print-preview-modal'
const previewFrame = ref(null)
const scale = ref('0.75')
const isFrameLoaded = ref(false)

const iframeStyle = computed(() => {
    const scaleValue = parseFloat(scale.value)
    return {
        transform: `scale(${scaleValue})`,
        transformOrigin: 'top center',
        width: `${100 / scaleValue}%`,
        height: `${100 / scaleValue}%`
    }
})

// Watch for visibility changes to update preview
watch(() => props.visible, (newValue) => {
    if (newValue) {
        nextTick(() => {
            _updatePreview()
        })
    }
})

// Watch for scale changes
watch(() => scale.value, () => {
    // Scale is applied via CSS
})

const _updatePreview = () => {
    if (!previewFrame.value) return

    const frameDoc = previewFrame.value.contentDocument || previewFrame.value.contentWindow.document

    // Get current page content
    const originalDoc = document
    const resumeElement = originalDoc.getElementById('resume')

    if (!resumeElement) return

    // Clone the resume content
    const clonedResume = resumeElement.cloneNode(true)

    // Build the print-optimized HTML
    const printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Resume Print Preview</title>
            <style>
                ${originalDoc.querySelector('style')?.innerHTML || ''}
            </style>
            <style>
                /* Inline print styles for iframe */
                @media print {
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                }

                /* Reset for preview */
                html, body {
                    margin: 0;
                    padding: 0;
                    background: white;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                body {
                    padding: 20px;
                }

                /* Hide navigation elements in preview */
                .nav-sidebar,
                .nav-mobile-section-picker,
                .nav-mobile-tab-controller,
                .nav-mobile-header,
                .nav-tab-controller,
                .nav-fill-top,
                .sidebar-column,
                .modal,
                .modal-backdrop,
                .print-button,
                .print-preview-button,
                .fa-button,
                .copy-button,
                .xl-button,
                .alert,
                .spinner,
                .loader,
                .language-picker,
                .nav-toggle-button,
                .nav-sidebar-footer,
                .nav-sidebar-link-list,
                .nav-profile-card,
                .filter-tabs {
                    display: none !important;
                }

                /* Layout adjustments */
                #resume {
                    display: block !important;
                    width: 100% !important;
                    background: white !important;
                }

                .navigation-wrapper {
                    display: block !important;
                    width: 100% !important;
                }

                .content-column {
                    width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    background: white !important;
                }

                .slot-wrapper {
                    display: block !important;
                }

                /* Section styles */
                .resume-section {
                    display: block !important;
                    min-height: auto !important;
                    height: auto !important;
                    page-break-inside: avoid;
                    break-inside: avoid;
                    padding: 0 !important;
                    margin: 0 0 1.5rem 0 !important;
                    border: none !important;
                    background: white !important;
                }

                .resume-section-content {
                    max-width: 100% !important;
                    padding: 0.5rem 0 !important;
                }

                /* Typography */
                h1 { font-size: 18pt; margin: 1rem 0 0.5rem; }
                h2 { font-size: 14pt; margin: 0.8rem 0 0.4rem; }
                h3 { font-size: 12pt; margin: 0.6rem 0 0.3rem; }

                p, ul, ol {
                    margin: 0.5rem 0;
                    line-height: 1.4;
                }

                /* Page break controls */
                .page-break-before {
                    page-break-before: always;
                    break-before: page;
                }

                article, .article,
                .timeline-item, .thread-item,
                .portfolio-item, .skills-item {
                    page-break-inside: avoid;
                    break-inside: avoid;
                }

                /* Links */
                a {
                    text-decoration: none;
                    color: #333;
                }

                a[href^="http"]:after {
                    content: " (" attr(href) ")";
                    font-size: 9pt;
                    color: #666;
                }

                /* Images */
                img {
                    max-width: 100%;
                    height: auto;
                }

                /* Page settings */
                @page {
                    margin: 1.5cm 1.5cm 2cm 1.5cm;
                    size: A4;
                }
            </style>
        </head>
        <body>
            ${clonedResume.outerHTML}
        </body>
        </html>
    `

    frameDoc.open()
    frameDoc.write(printHTML)
    frameDoc.close()
}

const _onFrameLoad = () => {
    isFrameLoaded.value = true
}

const _onRefresh = () => {
    _updatePreview()
}

const _onPrint = () => {
    emit('print')
    if (previewFrame.value && previewFrame.value.contentWindow) {
        previewFrame.value.contentWindow.print()
    }
}

const _onExportPDF = () => {
    emit('export')
    // Trigger browser print to PDF
    if (previewFrame.value && previewFrame.value.contentWindow) {
        previewFrame.value.contentWindow.print()
    }
}

const _onClose = () => {
    emit('close')
}

// Expose method to update preview
defineExpose({
    updatePreview: _updatePreview
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.print-preview-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: $light-1;
}

.print-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: white;
    border-bottom: 1px solid $light-4;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @include media-breakpoint-down(md) {
        flex-direction: column;
        gap: 1rem;
        padding: 0.75rem;
    }
}

.print-preview-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: $dark;
    display: flex;
    align-items: center;
}

.print-preview-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    @include media-breakpoint-down(sm) {
        justify-content: center;
    }
}

.print-preview-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: $light-3;
}

.print-preview-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background-color: white;
    border-bottom: 1px solid $light-4;

    @include media-breakpoint-down(sm) {
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;
    }
}

.print-preview-info {
    color: $text-muted;
    font-size: 0.875rem;

    i {
        color: $primary;
    }
}

.print-preview-scale {
    display: flex;
    align-items: center;

    label {
        color: $dark;
        font-weight: 500;
    }
}

.print-preview-frame-container {
    flex: 1;
    overflow: auto;
    padding: 2rem;
    display: flex;
    justify-content: center;
    background-color: $light-3;

    @include media-breakpoint-down(md) {
        padding: 1rem;
    }
}

.print-preview-iframe {
    width: 210mm;
    min-height: 297mm;
    background: white;
    border: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;
}

/* Modal customizations */
:deep(.modal-dialog) {
    max-width: 100%;
    margin: 0;
    height: 100vh;
}

:deep(.modal-content) {
    height: 100vh;
    border: none;
    border-radius: 0;
}

:deep(.modal-custom-content) {
    height: 100%;
    padding: 0;
}
</style>
