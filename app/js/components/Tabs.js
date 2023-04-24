const Tabs = () => {
    const classes = {
        wrap: 'js-tabs',
        nav: 'js-tabs-nav',
        navItem: 'js-tabs-nav-item',
        content: 'js-tabs-content',
        contentItem: 'js-tabs-content-item',
        active: 'js-active',
        bg: 'js-tabs-nav-bg',
    }

    document.querySelectorAll(`.${classes.wrap}`).forEach((tabs) => {
        tabs.querySelectorAll(`.${classes.contentItem}`).forEach((el) => (el.style.display = 'none'))

        const nav = tabs.querySelector(`.${classes.nav}`)
        const itemsNav = [...nav.querySelectorAll(`.${classes.navItem}`)]
        const lengthItemsNav = itemsNav.length
        const widthItem = 100 / lengthItemsNav
        const tabName = nav?.dataset?.tab
        const content = tabName ? tabs.querySelector(`.${classes.content}[data-tab="${tabName}"]`) : tabs.querySelector(`.${classes.content}`)
        const itemsContent = [...content.querySelectorAll(`.${classes.contentItem}`)].filter((item) => item.parentNode === content)

        const clickNavItem = (event) => {
            const target = event.target
            const item = target.closest(`.${classes.navItem}`)
            if (!item) return
            if (tabs !== item.closest(`.${classes.wrap}`)) return
            event.preventDefault()

            const activeIndexNav = itemsNav.indexOf(item) || +item.getAttribute('data-index')
            const addActiveItem = (item, index) => (index === activeIndexNav ? item.classList.add(classes.active) : item.classList.remove(classes.active))

            itemsNav.forEach(addActiveItem)
            itemsContent.forEach(addActiveItem)

            if (!bg) return
            const { left: leftItem } = item.getBoundingClientRect()
            const { left: leftNav } = nav.getBoundingClientRect()
            bg.classList.remove('js-move')
            bg.style.left = leftItem - leftNav - 1 + 'px'
        }

        tabs.addEventListener('click', clickNavItem)

        const bg = nav.querySelector(`.${classes.bg}`)
        if (!bg) return
        bg.style.width = widthItem + '%'
        let coord = 0
        let percentCurrentPosition = 0
        let activeIndex = itemsNav.findIndex((el) => el.classList.contains(classes.active))
        let oldActiveIndex = activeIndex

        const down = (e) => {
            e.preventDefault()

            const { width: widthBg, left: leftBg } = bg.getBoundingClientRect()
            const { width: widthNav, left: leftNav } = nav.getBoundingClientRect()

            const shiftX = (e.pageX ?? e.touches[0].pageX) - leftBg

            const move = (e) => {
                e.preventDefault()
                bg.classList.add('js-move')

                coord = (e.pageX ?? e.touches[0].pageX) - leftNav - shiftX
                if (coord < 0) coord = 0
                if (coord > widthNav - widthBg) coord = widthNav - widthBg

                percentCurrentPosition = (100 / widthNav) * (coord + widthBg / 2)
                activeIndex = Math.floor(percentCurrentPosition / widthItem)

                if (activeIndex !== oldActiveIndex) {
                    itemsNav.forEach((el, index) => (index === activeIndex ? el.classList.add(classes.active) : el.classList.remove(classes.active)))
                    oldActiveIndex = activeIndex
                }

                bg.style.left = coord + 'px'
            }

            const up = (e) => {
                e.preventDefault()

                window.removeEventListener('mousemove', move)
                window.removeEventListener('mouseup', up)
                window.removeEventListener('touchmove', move)
                window.removeEventListener('touchend', up)
                itemsNav[activeIndex].click()
            }

            window.addEventListener('mousemove', move)
            window.addEventListener('mouseup', up)
            window.addEventListener('touchmove', move)
            window.addEventListener('touchend', up)
        }

        bg.addEventListener('mousedown', down)
        bg.addEventListener('touchstart', down)
    })
}

export default Tabs
