import { menus, throttle } from '../utils'
import { closePopup } from './Popup'

const Menu = () => {
    const classes = {
        activeBody: 'js-menu-active',
        burger: 'js-menu-burger',
        close: 'js-menu-close',
        link: 'js-menu-link',
        subLink: 'js-menu-link-sub',
        subMenu: 'js-menu-sub',
        activeLink: 'js-active',
    }

    const open = () => {
        closePopup()
        document.body.classList.add(classes.activeBody)
    }

    const close = () => {
        document.body.classList.remove(classes.activeBody)
    }

    const toggle = () => {
        document.body.classList.contains(classes.activeBody) ? close() : open()
    }

    const clickBurger = (event) => {
        const target = event.target
        const menuBurger = target.closest(`.${classes.burger}`)

        if (!menuBurger) return
        event.preventDefault()

        toggle()
    }

    const clickClose = (event) => {
        const target = event.target
        const closeBtn = target.closest(`.${classes.close}`)

        if (!closeBtn) return
        event.preventDefault()

        close()
    }

    const clickLink = (event) => {
        const target = event.target
        const menuLink = target.closest(`.${classes.link}`)

        if (!menuLink) return
        close()
    }

    // active menu item on scroll
    const sections = []
    menus.forEach((el) => {
        const menuLinks = el.querySelectorAll(`.${classes.link}`)

        menuLinks.forEach((link) => {
            const id = link.getAttribute('href')
            if (!~id.indexOf('#')) return
            const section = document.querySelector(id)
            if (!section) return

            sections.push({
                section,
                link,
            })
        })
    })

    const activeMenuItemOnScroll = throttle(() => {
        const scrollY = window.pageYOffset

        for (const item of sections) {
            const { section, link } = item

            const sectionHeight = section.offsetHeight
            const sectionTop = section.offsetTop - 150

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add(classes.activeLink)
            } else {
                link.classList.remove(classes.activeLink)
            }
        }
    }, 100)

    document.body.addEventListener('click', clickBurger)
    document.body.addEventListener('click', clickLink)
    document.body.addEventListener('click', clickClose)
    window.addEventListener('scroll', activeMenuItemOnScroll)
}

export default Menu
