import { header } from '../utils'

export const ScrollTo = () => {
    document.body.addEventListener('click', (event) => {
        const target = event.target
        const link = target.closest('.js-scroll-to')

        if (!link) return false

        const href = link.getAttribute('href')
        if (!href.includes('#')) return false

        event.preventDefault()

        const scrollToItem = document.querySelector(href)

        if (scrollToItem) scroll(scrollToItem)
    })
}

export default ScrollTo

export const scroll = function (target) {
    const targetTop = target.getBoundingClientRect().top
    const headerOffset = header.offsetHeight || 100
    window.scrollBy({ top: targetTop - headerOffset, behavior: 'smooth' })
}
