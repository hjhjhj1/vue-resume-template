<template>
  <div v-if="isOpen" class="modal-overlay" @click="onClose">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="text-xl font-bold">打印预览</h2>
        <button
          @click="onClose"
          class="modal-close"
        >
          ×
        </button>
      </div>
      <div class="modal-body">
        <div class="flex gap-2 mb-4">
          <button
            @click="printResume"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            打印
          </button>
          <button
            @click="exportPDF"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            导出 PDF
          </button>
        </div>
        <div class="print-preview-container">
          <iframe
            ref="printIframe"
            class="print-iframe"
            @load="onIframeLoad"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrintPreviewModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    resumeContent: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  data() {
    return {
      printCSS: `
        button, input, textarea, select, .navigation, .nav-wrapper, .nav-sidebar, .nav-mobile-header, .nav-toggle-button, .nav-control-all-at-once, .nav-control-one-at-once, .nav-pills-controller, .nav-tab-controller, .filter-tabs, .language-picker, .options-list, .alert, .copy-button, .fa-button, .xl-button, .social-links, .modal, .modal-backdrop, .modal-overlay { display: none !important; }
        .section { page-break-inside: avoid; }
        .article { page-break-inside: avoid; }
        .article-title { page-break-after: avoid; }
        body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #000; background: #fff; }
      `
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onIframeLoad() {
      const iframeDoc = this.printIframe.contentDocument
      const styleElement = iframeDoc.createElement('style')
      styleElement.textContent = this.printCSS
      iframeDoc.head.appendChild(styleElement)
    },
    printResume() {
      if (this.printIframe) {
        this.printIframe.contentWindow.print()
      }
    },
    exportPDF() {
      if (this.printIframe) {
        const iframeWindow = this.printIframe.contentWindow
        iframeWindow.print()
      }
    },
    injectResumeContent() {
      if (this.printIframe && this.resumeContent) {
        const iframeDoc = this.printIframe.contentDocument
        iframeDoc.open()
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Resume</title>
            <style>${this.printCSS}</style>
          </head>
          <body>${this.resumeContent}</body>
          </html>
        `)
        iframeDoc.close()
      }
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.injectResumeContent()
        })
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #000;
}

.modal-body {
  padding: 20px;
}

.print-preview-container {
  width: 100%;
  height: 60vh;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.print-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>