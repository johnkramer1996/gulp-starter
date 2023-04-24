import { header, throttle } from '../utils'

const Header = () => {
    const fixedHeader = document.querySelector('.js-header-fixed')
    if (!fixedHeader || !header) return

    const activeClass = 'js-fixed'

    const fixed = throttle(() => {
        const positionFixedHeader = fixedHeader.offsetTop - 50 || -1
        window.pageYOffset > positionFixedHeader ? header.classList.add(activeClass) : header.classList.remove(activeClass)
    }, 100)

    window.addEventListener('scroll', fixed)
}

export default Header
