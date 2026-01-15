<template>
    <div class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h3 class="modal-title">打印预览</h3>
                <button class="modal-close" @click="closeModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="preview-container">
                    <iframe
                        ref="previewIframe"
                        class="preview-iframe"
                        sandbox="allow-same-origin allow-scripts"
                        @load="onIframeLoaded"
                    ></iframe>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" @click="closeModal">
                    关闭
                </button>
                <button class="btn btn-primary" @click="handlePrint" :disabled="!isReady">
                    <i class="fas fa-print"></i>
                    打印
                </button>
                <button class="btn btn-success" @click="exportPDF" :disabled="!isReady">
                    <i class="fas fa-file-pdf"></i>
                    导出 PDF
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePrint } from "/src/composables/print.js";

const emit = defineEmits(['close']);

const print = usePrint();
const previewIframe = ref(null);
const isReady = ref(false);

const closeModal = () => {
    emit('close');
};

const onIframeLoaded = () => {
    isReady.value = true;
};

const handlePrint = () => {
    if (previewIframe.value && isReady.value) {
        previewIframe.value.contentWindow.print();
    }
};

const exportPDF = () => {
    if (previewIframe.value && isReady.value) {
        const iframeWindow = previewIframe.value.contentWindow;
        iframeWindow.print();
    }
};

onMounted(() => {
    const loadPreview = () => {
        const previewContent = print.getPreviewContent();
        if (previewContent && previewIframe.value) {
            const printHTML = print.generatePrintHTML(previewContent);
            const iframeWindow = previewIframe.value.contentWindow;

            try {
                iframeWindow.document.open();
                iframeWindow.document.write(printHTML);
                iframeWindow.document.close();
            } catch (error) {
                console.error('Error writing to iframe:', error);
                // Fallback approach
                previewIframe.value.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(printHTML);
            }
        } else {
            console.error('Preview content or iframe not available:', { previewContent, iframe: previewIframe.value });
        }
    };

    setTimeout(loadPreview, 100);
});
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: auto;
    padding: 2rem;
}

.modal-content {
    background-color: #fff;
    border-radius: 8px;
    max-width: 95%;
    max-height: 95vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f8f9fa;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.modal-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #666;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.2s;

    &:hover {
        color: #000;
    }
}

.modal-body {
    flex: 1;
    overflow: hidden;
    padding: 0;
}

.preview-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
    background-color: #f5f5f5;
}

.preview-iframe {
    width: 100%;
    max-width: 800px;
    height: 100%;
    min-height: 600px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem 2rem;
    border-top: 1px solid #e0e0e0;
    background-color: #f8f9fa;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-secondary {
    background-color: #6c757d;
    color: #fff;

    &:hover {
        background-color: #5a6268;
    }
}

.btn-primary {
    background-color: #007bff;
    color: #fff;

    &:hover:not(:disabled) {
        background-color: #0056b3;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.btn-success {
    background-color: #28a745;
    color: #fff;

    &:hover:not(:disabled) {
        background-color: #1e7e34;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}
</style>
