export function usePrint() {
 const generatePrintHTML = (resumeContent) => {
 const printStyles = `
 <style>
 @page {
 size: A4;
 margin: 1.5cm;
 }

 body {
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
 -webkit-print-color-adjust: exact;
 color-adjust: exact;
 }

 .print-resume-content {
 max-width: 100%;
 padding: 1rem;
 }

 .resume-section {
 page-break-inside: auto;
 margin-bottom: 1rem;
 }

 .resume-section-content {
 padding: 1rem;
 }

 .section-header {
 break-after: avoid-page;
 page-break-after: avoid;
 break-inside: avoid;
 page-break-inside: avoid;
 margin-bottom: 1rem;
 }

 .article {
 break-inside: avoid;
 page-break-inside: avoid;
 }

 .article-title {
 break-after: avoid-page;
 page-break-after: avoid;
 }

 .article-timeline-item {
 break-inside: avoid;
 page-break-inside: avoid;
 margin-bottom: 0.5rem;
 }

 img {
 max-width: 100% !important;
 page-break-inside: avoid;
 }

 a {
 color: inherit !important;
 text-decoration: none !important;
 }

 .print-avoid-break {
 break-inside: avoid;
 page-break-inside: avoid;
 }
 </style>
 `;

 return `
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 ${printStyles}
 </head>
 <body>
 <div class="print-resume-content">
 ${resumeContent}
 </div>
 </body>
 </html>
 `;
 };

 const prepareForPrint = () => {
 const resumeElement = document.getElementById('resume');
 if (!resumeElement) {
 console.error('Resume element not found');
 return null;
 }

 const clone = resumeElement.cloneNode(true);
 const sidebar = clone.querySelector('.sidebar-column');
 if (sidebar) {
 sidebar.remove();
 }

 const navElements = clone.querySelectorAll(
 '.nav-mobile-header, .nav-toggle-button, .nav-pills-controller, .nav-pills-controller-fixed, .nav-tab-controller, .nav-sidebar, .nav-fill-top, .btn, button, .social-links, .copy-button, .filter-tabs, .language-picker'
 );
 navElements.forEach(el => el.remove());

 const contentColumn = clone.querySelector('.content-column');
 if (contentColumn) {
 contentColumn.style.width = '100%';
 contentColumn.style.marginBottom = '0';
 }

 const sections = clone.querySelectorAll('.resume-section');
 sections.forEach(section => {
 section.style.minHeight = 'auto';
 section.style.height = 'auto';
 });

 return clone.innerHTML;
 };

 const printResume = () => {
 const printContent = prepareForPrint();
 if (!printContent) return;

 const printHTML = generatePrintHTML(printContent);

 const iframe = document.createElement('iframe');
 iframe.style.position = 'absolute';
 iframe.style.width = '0';
 iframe.style.height = '0';
 iframe.style.border = 'none';

 document.body.appendChild(iframe);

 const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
 iframeDoc.open();
 iframeDoc.write(printHTML);
 iframeDoc.close();

 iframe.onload = () => {
 setTimeout(() => {
 iframe.contentWindow.print();
 setTimeout(() => {
 document.body.removeChild(iframe);
 }, 1000);
 }, 500);
 };
 };

 const getPreviewContent = () => {
 return prepareForPrint();
 };

 return {
 printResume,
 getPreviewContent,
 generatePrintHTML
 };
}
