import {ref, onMounted, onUnmounted} from "vue"

export function usePrintPagination() {
    const pageHeight = ref(1123)
    const pageWidth = ref(794)
    const marginTop = ref(56)
    const marginBottom = ref(56)
    const marginLeft = ref(56)
    const marginRight = ref(56)
    
    const availableHeight = ref(0)
    
    onMounted(() => {
        calculateAvailableHeight()
        window.addEventListener('resize', calculateAvailableHeight)
    })
    
    onUnmounted(() => {
        window.removeEventListener('resize', calculateAvailableHeight)
    })
    
    const calculateAvailableHeight = () => {
        availableHeight.value = pageHeight.value - marginTop.value - marginBottom.value
    }
    
    const checkElementHeight = (element) => {
        if (!element) return 0
        return element.offsetHeight
    }
    
    const shouldBreakBefore = (element, currentPageHeight) => {
        if (!element) return false
        
        const elementHeight = checkElementHeight(element)
        const remainingSpace = availableHeight.value - currentPageHeight
        
        if (remainingSpace < elementHeight * 0.3) {
            return true
        }
        
        const isHeading = element.tagName && ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)
        if (isHeading && remainingSpace < 100) {
            return true
        }
        
        return false
    }
    
    const shouldBreakAfter = (element, currentPageHeight) => {
        if (!element) return false
        
        const elementHeight = checkElementHeight(element)
        const newPageHeight = currentPageHeight + elementHeight
        
        if (newPageHeight > availableHeight.value) {
            return true
        }
        
        return false
    }
    
    const addPageBreakClass = (element, position = 'before') => {
        if (!element) return
        
        const className = position === 'before' ? 'print-break-before' : 'print-break-after'
        element.classList.add(className)
    }
    
    const removePageBreakClass = (element, position = 'before') => {
        if (!element) return
        
        const className = position === 'before' ? 'print-break-before' : 'print-break-after'
        element.classList.remove(className)
    }
    
    const processSectionPagination = (sectionElement) => {
        if (!sectionElement) return
        
        const sectionHeader = sectionElement.querySelector('.section-header')
        const sectionBody = sectionElement.querySelector('.section-body')
        
        if (sectionHeader) {
            sectionHeader.classList.add('print-break-inside-avoid')
        }
        
        if (sectionBody) {
            sectionBody.classList.add('print-break-inside-avoid')
            
            const articles = sectionBody.querySelectorAll('.article')
            articles.forEach(article => {
                article.classList.add('print-break-inside-avoid')
                
                const articleTitle = article.querySelector('.article-title')
                if (articleTitle) {
                    articleTitle.classList.add('print-break-after')
                }
            })
        }
    }
    
    const processTimelineItems = (timelineElement) => {
        if (!timelineElement) return
        
        const items = timelineElement.querySelectorAll('.timeline-item')
        items.forEach(item => {
            item.classList.add('print-break-inside-avoid')
            
            const content = item.querySelector('.timeline-item-content')
            if (content) {
                content.classList.add('print-break-inside-avoid')
            }
        })
    }
    
    const processPortfolioItems = (portfolioElement) => {
        if (!portfolioElement) return
        
        const items = portfolioElement.querySelectorAll('.portfolio-item')
        items.forEach(item => {
            item.classList.add('print-break-inside-avoid')
        })
    }
    
    const processSkillsItems = (skillsElement) => {
        if (!skillsElement) return
        
        const items = skillsElement.querySelectorAll('.skills-item')
        items.forEach(item => {
            item.classList.add('print-break-inside-avoid')
        })
    }
    
    const processProfileItems = (profileElement) => {
        if (!profileElement) return
        
        const items = profileElement.querySelectorAll('.profile-item')
        items.forEach(item => {
            item.classList.add('print-break-inside-avoid')
        })
    }
    
    const applyPaginationRules = (container) => {
        if (!container) return
        
        const sections = container.querySelectorAll('.section')
        sections.forEach(section => {
            processSectionPagination(section)
        })
        
        const timelines = container.querySelectorAll('.timeline')
        timelines.forEach(timeline => {
            processTimelineItems(timeline)
        })
        
        const portfolios = container.querySelectorAll('.portfolio')
        portfolios.forEach(portfolio => {
            processPortfolioItems(portfolio)
        })
        
        const skills = container.querySelectorAll('.skills')
        skills.forEach(skill => {
            processSkillsItems(skill)
        })
        
        const profiles = container.querySelectorAll('.profile')
        profiles.forEach(profile => {
            processProfileItems(profile)
        })
    }
    
    const removePaginationClasses = (container) => {
        if (!container) return
        
        const elements = container.querySelectorAll('.print-break-before, .print-break-after, .print-break-inside-avoid')
        elements.forEach(element => {
            element.classList.remove('print-break-before', 'print-break-after', 'print-break-inside-avoid')
        })
    }
    
    const getPrintContent = () => {
        const resumeElement = document.getElementById('resume')
        if (!resumeElement) return ''
        
        applyPaginationRules(resumeElement)
        
        const content = resumeElement.outerHTML
        
        removePaginationClasses(resumeElement)
        
        return content
    }
    
    return {
        pageHeight,
        pageWidth,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        availableHeight,
        checkElementHeight,
        shouldBreakBefore,
        shouldBreakAfter,
        addPageBreakClass,
        removePageBreakClass,
        processSectionPagination,
        processTimelineItems,
        processPortfolioItems,
        processSkillsItems,
        processProfileItems,
        applyPaginationRules,
        removePaginationClasses,
        getPrintContent
    }
}
