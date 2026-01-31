<template>
    <Modal id="print-preview-modal"
           modal-type="modal-fullscreen"
           dialog-type="modal-dialog-centered"
           :visible="visible"
           :dismissable="true"
           @close="_onClose">
        <div class="print-preview-container">
            <div class="print-preview-header">
                <h3 class="print-preview-title">
                    <IconView icon="fa-solid fa-print" class="me-2"/>
                    打印预览
                </h3>
                <div class="print-preview-actions">
                    <button class="btn btn-outline-secondary me-2"
                            @click="_refreshPreview">
                        <IconView icon="fa-solid fa-rotate-right" class="me-1"/>
                        刷新预览
                    </button>
                    <button class="btn btn-primary me-2"
                            @click="_directPrint">
                        <IconView icon="fa-solid fa-print" class="me-1"/>
                        直接打印
                    </button>
                    <button class="btn btn-success"
                            @click="_exportPdf">
                        <IconView icon="fa-solid fa-file-pdf" class="me-1"/>
                        导出 PDF
                    </button>
                </div>
            </div>
            <div class="print-preview-body">
                <div class="print-preview-iframe-wrapper">
                    <div class="print-preview-page"
                         :style="{ width: pageWidth + 'px', minHeight: pageHeight + 'px' }">
                        <iframe ref="previewIframe"
                                class="print-preview-iframe"
                                @load="_onIframeLoaded"
                                sandbox="allow-same-origin allow-scripts allow-modals">
                        </iframe>
                    </div>
                </div>
            </div>
            <div class="print-preview-footer">
                <div class="print-preview-info">
                    <span class="info-item">
                        <IconView icon="fa-solid fa-file" class="me-1"/>
                        页面尺寸: A4 (210 × 297 mm)
                    </span>
                    <span class="info-item">
                        <IconView icon="fa-solid fa-info-circle" class="me-1"/>
                        建议使用 Chrome 或 Edge 浏览器以获得最佳打印效果
                    </span>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import {ref, watch, nextTick} from "vue"
import Modal from "/src/vue/components/modals/base/Modal.vue"
import IconView from "/src/vue/components/widgets/IconView.vue"

const props = defineProps({
    visible: Boolean,
    content: String
})

const emit = defineEmits(['close', 'print'])

const previewIframe = ref(null)
const iframeLoaded = ref(false)
const pageWidth = ref(800)
const pageHeight = ref(1200)

const _generatePrintStyles = () => {
    return `
        <style>
            @page {
                size: A4;
                margin: 15mm 10mm;
            }
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            body {
                background: white !important;
                font-size: 12pt !important;
                line-height: 1.4 !important;
                margin: 0;
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
            .navigation-wrapper,
            .sidebar-column,
            .nav-control,
            .nav-pills-controller,
            .nav-pills-controller-fixed,
            .nav-tab-controller,
            .nav-mobile-header,
            .nav-fill-top,
            .print-button,
            .btn,
            button,
            .no-print {
                display: none !important;
            }
            #resume {
                background: white !important;
                display: block !important;
                min-height: auto !important;
            }
            .content-column {
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
                background: white !important;
            }
            .slot-wrapper {
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .section {
                page-break-inside: avoid;
                break-inside: avoid;
                margin-bottom: 1rem !important;
            }
            .section-header {
                page-break-after: avoid;
                break-after: avoid;
            }
            .section-title {
                font-size: 16pt !important;
                margin-bottom: 0.5rem !important;
                padding-bottom: 0.3rem !important;
                border-bottom: 2px solid #333 !important;
            }
            .section-body {
                page-break-before: avoid;
                break-before: avoid;
            }
            .article {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            .article-title {
                page-break-after: avoid;
                break-after: avoid;
                page-break-inside: avoid;
                break-inside: avoid;
            }
            .article-title h2,
            .article-title h3,
            .article-title h4 {
                page-break-after: avoid;
                break-after: avoid;
                page-break-inside: avoid;
                break-inside: avoid;
                orphans: 3;
                widows: 3;
            }
            .article-item {
                page-break-inside: avoid;
                break-inside: avoid;
                margin-bottom: 0.8rem !important;
            }
            .timeline-item,
            .thread-item,
            .skills-item,
            .portfolio-item {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            h1, h2, h3, h4, h5, h6 {
                page-break-after: avoid;
                break-after: avoid;
                page-break-inside: avoid;
                break-inside: avoid;
                orphans: 3;
                widows: 3;
            }
            p {
                orphans: 3;
                widows: 3;
                margin: 0 0 0.5rem 0 !important;
            }
            ul, ol {
                page-break-inside: avoid;
                break-inside: avoid;
                padding-left: 1.5rem !important;
                margin: 0.5rem 0 !important;
            }
            li {
                orphans: 3;
                widows: 3;
                margin-bottom: 0.3rem !important;
            }
            img {
                page-break-inside: avoid;
                break-inside: avoid;
                max-width: 100% !important;
            }
            a {
                color: #000 !important;
                text-decoration: none !important;
            }
            .progress-bar-container {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            .progress-bar {
                background-color: #e0e0e0 !important;
                border-radius: 0.25rem !important;
            }
            .progress-bar-fill {
                background-color: #333 !important;
            }
            .tag {
                display: inline-block !important;
                border: 1px solid #666 !important;
                padding: 0.2rem 0.5rem !important;
                margin: 0.2rem !important;
                border-radius: 0.25rem !important;
                font-size: 0.9em !important;
            }
            .solid-divider {
                border: none !important;
                border-top: 1px solid #ccc !important;
                margin: 1rem 0 !important;
            }
            .language-picker {
                display: none !important;
            }
            .card {
                page-break-inside: avoid;
                break-inside: avoid;
                box-shadow: none !important;
                border: 1px solid #ccc !important;
            }
            table {
                page-break-inside: avoid;
                break-inside: avoid;
                width: 100% !important;
                border-collapse: collapse !important;
            }
            th, td {
                border: 1px solid #ccc !important;
                padding: 0.5rem !important;
                text-align: left !important;
            }
            blockquote {
                page-break-inside: avoid;
                break-inside: avoid;
                border-left: 3px solid #666 !important;
                padding-left: 1rem !important;
                margin-left: 0 !important;
                font-style: italic !important;
            }
        </style>
    `
}

const _getPrintContent = () => {
    const resumeEl = document.getElementById('resume')
    if (!resumeEl) return ''

    const contentColumn = resumeEl.querySelector('.content-column')
    if (!contentColumn) return resumeEl.innerHTML

    const slotWrapper = contentColumn.querySelector('.slot-wrapper')
    if (slotWrapper) {
        return slotWrapper.innerHTML
    }

    return contentColumn.innerHTML
}

const _populateIframe = () => {
    if (!previewIframe.value) return

    const iframe = previewIframe.value
    const doc = iframe.contentDocument || iframe.contentWindow.document

    const styles = _generatePrintStyles()
    const content = _getPrintContent()

    doc.open()
    doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>打印预览</title>
            ${styles}
        </head>
        <body>
            ${content}
        </body>
        </html>
    `)
    doc.close()
}

const _onIframeLoaded = () => {
    iframeLoaded.value = true
    nextTick(() => {
        _populateIframe()
    })
}

const _refreshPreview = () => {
    _populateIframe()
}

const _directPrint = () => {
    if (previewIframe.value) {
        const iframe = previewIframe.value
        iframe.contentWindow.focus()
        iframe.contentWindow.print()
    }
}

const _exportPdf = () => {
    if (previewIframe.value) {
        const iframe = previewIframe.value
        iframe.contentWindow.focus()
        iframe.contentWindow.print()
    }
}

const _onClose = () => {
    emit('close')
}

watch(() => props.visible, (newVal) => {
    if (newVal) {
        nextTick(() => {
            if (iframeLoaded.value) {
                _populateIframe()
            }
        })
    }
})
</script>

<style lang="scss" scoped>
.print-preview-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f5f5;
}

.print-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: white;
    border-bottom: 1px solid #dee2e6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.print-preview-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
}

.print-preview-actions {
    display: flex;
    gap: 0.5rem;
}

.print-preview-body {
    flex: 1;
    overflow: auto;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.print-preview-iframe-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
}

.print-preview-page {
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    width: 100%;
}

.print-preview-iframe {
    width: 100%;
    min-height: 1000px;
    border: none;
    display: block;
}

.print-preview-footer {
    padding: 1rem 1.5rem;
    background-color: white;
    border-top: 1px solid #dee2e6;
}

.print-preview-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.info-item {
    display: flex;
    align-items: center;
    color: #666;
    font-size: 0.875rem;
}

.modal-fullscreen {
    padding: 0 !important;
}

.modal-fullscreen .modal-dialog {
    max-width: 100%;
    width: 100%;
    height: 100%;
    margin: 0;
}

.modal-fullscreen .modal-content {
    height: 100vh;
    border: none;
    border-radius: 0;
}

.modal-fullscreen .modal-custom-content {
    height: 100%;
    min-height: 100vh;
}
</style>
