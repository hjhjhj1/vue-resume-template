import {inject, ref} from "vue"

export const usePrint = () => {
    const showPrintPreviewModal = inject("showPrintPreviewModal", null)

    const isPrinting = ref(false)

    const openPrintPreview = () => {
        if (showPrintPreviewModal) {
            showPrintPreviewModal()
        }
    }

    const directPrint = () => {
        isPrinting.value = true
        
        const printWindow = window.open('', '_blank')
        if (!printWindow) {
            console.error('无法打开打印窗口，请允许弹出窗口')
            isPrinting.value = false
            return
        }

        const resumeEl = document.getElementById('resume')
        if (!resumeEl) {
            console.error('未找到简历内容')
            isPrinting.value = false
            return
        }

        const contentColumn = resumeEl.querySelector('.content-column')
        const content = contentColumn ? contentColumn.innerHTML : resumeEl.innerHTML

        const styles = `
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
            a[href^="http"]:after {
                content: " (" attr(href) ")";
                font-size: 0.8em;
                color: #666;
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
        `

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>简历打印</title>
                <style>${styles}</style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `)

        printWindow.document.close()
        
        printWindow.onload = () => {
            printWindow.focus()
            setTimeout(() => {
                printWindow.print()
                isPrinting.value = false
            }, 500)
        }

        printWindow.onafterprint = () => {
            isPrinting.value = false
        }
    }

    const exportToPdf = () => {
        directPrint()
    }

    return {
        isPrinting,
        openPrintPreview,
        directPrint,
        exportToPdf
    }
}
