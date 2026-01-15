<template>
    <Modal id="printPreviewModal"
           modalType="modal-xl"
           dialogType="modal-dialog-centered"
           :visible="visible"
           :dismissable="true"
           @close="onClose">
        <div class="print-preview-container">
            <div class="print-preview-header">
                <h5 class="modal-title">打印预览</h5>
                <div class="print-preview-actions">
                    <button class="btn btn-primary me-2" @click="onPrint">
                        <i class="fas fa-print me-1"></i> 打印 / 保存为PDF
                    </button>
                    <button class="btn btn-secondary" @click="onClose">
                        <i class="fas fa-times me-1"></i> 关闭
                    </button>
                </div>
            </div>
            <div class="print-preview-body">
                <iframe ref="iframeRef"
                        class="print-preview-iframe"
                        @load="onIframeLoad"></iframe>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import {ref, watch, nextTick} from "vue"
import Modal from "/src/vue/components/modals/base/Modal.vue"

const props = defineProps({
    visible: Boolean,
    content: String
})

const emit = defineEmits(['close'])

const iframeRef = ref(null)

watch(() => props.visible, (newVal) => {
    if (newVal) {
        nextTick(() => {
            updateIframeContent()
        })
    }
})

watch(() => props.content, () => {
    if (props.visible) {
        updateIframeContent()
    }
})

const onIframeLoad = () => {
    injectPrintStyles()
}

const updateIframeContent = () => {
    if (!iframeRef.value || !props.content) return

    const iframe = iframeRef.value
    const doc = iframe.contentDocument || iframe.contentWindow.document

    doc.open()
    doc.write(props.content)
    doc.close()
}

const injectPrintStyles = () => {
    if (!iframeRef.value) return

    const iframe = iframeRef.value
    const doc = iframe.contentDocument || iframe.contentWindow.document

    const style = doc.createElement('style')
    style.textContent = getPrintStyles()
    doc.head.appendChild(style)

    const link = doc.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/src/scss/style.scss'
    doc.head.appendChild(link)
}

const getPrintStyles = () => {
    return `
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        @page {
            size: A4;
            margin: 10mm;
        }

        html, body {
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            background: white !important;
            color: #333 !important;
            font-size: 11pt;
            line-height: 1.4;
        }

        #resume {
            display: block !important;
            background: white !important;
            min-height: auto !important;
            width: 100%;
        }

        .print-controls,
        .print-preview-button,
        .print-button,
        .nav-sidebar,
        .nav-fill-top,
        .nav-mobile-header,
        .nav-toggle-button,
        .nav-profile-card,
        .nav-sidebar-footer,
        .nav-pills-controller,
        .nav-pills-controller-fixed,
        .nav-tab-controller,
        .nav-control-all-at-once,
        .nav-control-one-at-once,
        .nav-sidebar-link-list,
        .modal,
        .modal-backdrop,
        .modal-content,
        .modal-dialog,
        .copy-button,
        .fa-button,
        .filter-tabs,
        .social-links,
        .alert,
        .spinner,
        .activity-spinner,
        .loader,
        button,
        .btn,
        .btn-outline-primary,
        .btn-primary,
        .xl-button {
            display: none !important;
            visibility: hidden !important;
        }

        .section {
            page-break-inside: avoid;
            margin-bottom: 25px;
            padding: 15px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .section:last-child {
            border-bottom: none;
        }

        .section-header {
            page-break-after: avoid;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #333;
        }

        .section-header h2 {
            font-size: 16pt;
            font-weight: 700;
            color: #333;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .section-body {
            page-break-inside: avoid;
            padding: 0;
        }

        .article {
            page-break-inside: avoid;
            margin-bottom: 20px;
            padding: 10px 0;
        }

        .article-title {
            page-break-after: avoid;
            font-size: 13pt;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
        }

        .article-profile-item,
        .article-timeline-item,
        .article-skills-item,
        .article-portfolio-item {
            page-break-inside: avoid;
            padding: 8px 0;
        }

        h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            page-break-inside: avoid;
            color: #333;
            font-weight: 600;
        }

        h1 {
            font-size: 20pt;
            margin-bottom: 15px;
        }

        h2 {
            font-size: 16pt;
            margin-bottom: 12px;
        }

        h3 {
            font-size: 14pt;
            margin-bottom: 10px;
        }

        h4 {
            font-size: 12pt;
            margin-bottom: 8px;
        }

        .timeline-item,
        .portfolio-item,
        .skills-item,
        .profile-item {
            page-break-inside: avoid;
            margin-bottom: 15px;
        }

        .timeline-item-content {
            page-break-inside: avoid;
            padding: 10px;
            background: #f9f9f9;
            border-radius: 4px;
        }

        .contact-form,
        .contact-form-fields,
        .contact-form-thank-you {
            display: none !important;
        }

        .contact-options {
            page-break-inside: avoid;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }

        .contact-option {
            padding: 8px 12px;
            background: #f5f5f5;
            border-radius: 4px;
            font-size: 10pt;
        }

        .image-view {
            page-break-inside: avoid;
            text-align: center;
            margin: 15px 0;
        }

        .image-view img {
            max-width: 120px;
            max-height: 120px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .progress-bar {
            page-break-inside: avoid;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin: 10px 0;
        }

        .progress-bar-fill {
            height: 100%;
            background: #333;
            border-radius: 4px;
        }

        .tags {
            page-break-inside: avoid;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .tag {
            padding: 4px 10px;
            background: #f5f5f5;
            border-radius: 3px;
            font-size: 9pt;
            color: #333;
        }

        .inline-info-list,
        .inline-link-list {
            page-break-inside: avoid;
            list-style: none;
            padding: 0;
            margin: 10px 0;
        }

        .inline-info-list li,
        .inline-link-list li {
            padding: 5px 0;
            font-size: 10pt;
            color: #555;
        }

        .info-badge {
            page-break-inside: avoid;
            display: inline-block;
            padding: 4px 8px;
            background: #f5f5f5;
            border-radius: 3px;
            font-size: 9pt;
            margin: 2px;
        }

        .solid-divider {
            page-break-inside: avoid;
            height: 1px;
            background: #e0e0e0;
            margin: 15px 0;
        }

        a {
            text-decoration: none;
            color: #333 !important;
        }

        a[href]:after {
            content: " (" attr(href) ")";
            font-size: 0.75em;
            color: #666;
        }

        a[href^="#"]:after,
        a[href^="javascript:"]:after {
            content: "";
        }

        img {
            max-width: 100%;
            height: auto;
            page-break-inside: avoid;
            display: block;
            margin: 10px auto;
        }

        .portfolio-image img,
        .project-logo {
            max-width: 80px;
            max-height: 80px;
            object-fit: contain;
        }

        table {
            page-break-inside: auto;
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }

        tr {
            page-break-inside: avoid;
            page-break-after: auto;
        }

        td {
            page-break-inside: avoid;
            page-break-after: auto;
            padding: 8px;
            border: 1px solid #e0e0e0;
        }

        th {
            background: #f5f5f5;
            font-weight: 600;
            padding: 8px;
            border: 1px solid #e0e0e0;
        }

        .no-print {
            display: none !important;
            visibility: hidden !important;
        }

        .print-only {
            display: block !important;
        }

        .pie-chart,
        .chart {
            max-width: 200px;
            max-height: 200px;
            margin: 10px auto;
        }

        .skills-pie-chart {
            page-break-inside: avoid;
            margin: 15px 0;
        }

        .print-break-before {
            page-break-before: always;
        }

        .print-break-after {
            page-break-after: always;
        }

        .print-break-inside-avoid {
            page-break-inside: avoid;
        }
    `
}

const onPrint = () => {
    if (!iframeRef.value) return

    const iframe = iframeRef.value
    iframe.contentWindow.print()
}

const onClose = () => {
    emit('close')
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.print-preview-container {
    display: flex;
    flex-direction: column;
    height: 80vh;
}

.print-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid $border-color;
    background-color: $light-1;

    .modal-title {
        margin: 0;
        font-weight: 600;
        color: $dark;
    }

    .print-preview-actions {
        display: flex;
        gap: 10px;
    }
}

.print-preview-body {
    flex: 1;
    overflow: hidden;
    background-color: $light-2;
    padding: 20px;
}

.print-preview-iframe {
    width: 100%;
    height: 100%;
    border: none;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
