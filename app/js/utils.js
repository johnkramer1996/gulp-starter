import { closePopup } from './components/Popup'

export const debounce = (func, wait, immediate = true) => {
    let timeout
    return function () {
        const context = this,
            args = arguments
        const later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

export const throttle = (callback, limit) => {
    var waiting = false
    return function () {
        if (!waiting) {
            callback.apply(this, arguments)
            waiting = true
            setTimeout(function () {
                waiting = false
            }, limit)
        }
    }
}

export const slideUp = (target, duration = 500) => {
    if (!target) return
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.boxSizing = 'border-box'
    target.style.height = target.offsetHeight + 'px'
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
        target.style.display = 'none'
        target.style.removeProperty('height')
        target.style.removeProperty('padding-top')
        target.style.removeProperty('padding-bottom')
        target.style.removeProperty('margin-top')
        target.style.removeProperty('margin-bottom')
        target.style.removeProperty('overflow')
        target.style.removeProperty('transition-duration')
        target.style.removeProperty('transition-property')
    }, duration)
}

export const slideDown = (target, duration = 500) => {
    if (!target) return
    target.style.removeProperty('display')
    let display = window.getComputedStyle(target).display
    if (display === 'none') display = 'block'
    target.style.display = display
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.boxSizing = 'border-box'
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
        target.style.removeProperty('height')
        target.style.removeProperty('overflow')
        target.style.removeProperty('transition-duration')
        target.style.removeProperty('transition-property')
    }, duration)
}

export const slideToggle = (target, duration = 500) => {
    window.getComputedStyle(target).display === 'none' ? slideDown(target, duration) : slideUp(target, duration)
}

export const isMobile = () => window.innerWidth < gridBreakpoints.lg

export const checkInput = (input) => {
    const inputParent = input.closest('.js-input')
    const inputType = input.getAttribute('type')
    const inputName = input.getAttribute('name')

    inputParent.classList.remove('js-error', 'js-success')

    if (inputParent.classList.contains('js-inactive')) return
    if (input.classList.contains('js-input-mobile') && !isMobile()) return
    if (input.classList.contains('js-input-desctop') && isMobile()) return

    if (input.value === '') {
        inputParent.classList.add('js-error')
    } else if (input.classList.contains('js-input-name') && !validateName(input.value)) {
        inputParent.classList.add('js-error')
    } else if (input.classList.contains('js-input-phone') && input.value.includes('_')) {
        inputParent.classList.add('js-error')
    } else if (input.classList.contains('js-input-email') && !validateEmail(input.value)) {
        inputParent.classList.add('js-error')
    } else if ((inputType === 'radio' || inputType === 'checkbox') && !inputParent.querySelector(`input[name="${inputName}"]:checked`)) {
        input.checked = false
        inputParent.classList.add('js-error')
    } else {
        inputParent.classList.add('js-success')
    }
}

export const validateName = (value) => {
    const reg = /^[a-zа-яёїієґ ,.'-]+$/i
    return reg.test(value)
}

export const validateEmail = (value) => {
    const reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
    return reg.test(value)
}

export const isVisible = (elem) => elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0

export const getViewSize = (() => {
    const viewPort = [...document.querySelectorAll('.js-view-port div')]
    return () => viewPort.find(isVisible).dataset.size
})()

export const gridBreakpoints = {
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 480,
}

export const header = document.querySelector('.js-header')
export const menus = [...document.querySelectorAll('.js-menu')]
export const popup = document.querySelector('.js-popup')

export const loadScript = (url, callback) => {
    var script = document.createElement('script')

    if (script.readyState) {
        // IE
        script.onreadystatechange = () => {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null
                callback()
            }
        }
    } else {
        // other browsers
        script.onload = () => callback()
    }

    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
}

export const downloadFile = (file) => {
    const link = document.createElement('a')
    link.setAttribute('download', file)
    link.href = file
    document.body.appendChild(link)
    link.click()
    link.remove()
    closePopup()
}

export const classes = {
    active: 'js-active',
    hidden: 'js-hidden',
}
