import { getViewSize, slideDown, slideUp } from '../utils'

const More = () => {
    const classes = {
        more: 'js-more',
        items: 'js-more-item',
        btn: 'js-more-btn',
        btnToggle: 'js-more-btn-toggle',
        active: 'js-active',
        hidden: 'js-hidden',
    }

    const attributeInitShow = 'data-more'
    const attributeShow = 'data-show'

    document.querySelectorAll(`.${classes.more}`).forEach((more) => {
        const items = more.querySelectorAll(`.${classes.items}`)
        const btnToggle = more.querySelector(`.${classes.btnToggle}`)

        if (!btnToggle) return

        const hide = () => {
            const size = getViewSize()

            const isAttribute = more.getAttribute(`${attributeInitShow}-${size}`)
            const activeItem = isAttribute ? isAttribute.split(',')[0] : 1
            const countShowItem = isAttribute ? isAttribute.split(',')[1] : 1

            more.setAttribute(attributeShow, countShowItem)

            if (items.length <= activeItem) btnToggle.style.display = 'none'

            items.forEach((item, index) => {
                item.classList.add(classes.active)
                item.classList.remove(classes.hidden)
                item.style.display = 'block'

                if (index >= activeItem) {
                    item.classList.remove(classes.active)
                    item.classList.add(classes.hidden)
                    item.style.display = 'none'
                }
            })
        }

        const clickBtn = (event) => {
            const target = event.target
            const btn = target.closest(`.${classes.btn}`)

            if (!btn) return false
            event.preventDefault()

            const more = btn.closest(`.${classes.more}`)
            const countShowItem = +more.getAttribute(attributeShow)
            const hideItems = more.querySelectorAll(`.${classes.items}:not(.${classes.active})`)

            hideItems.forEach((item, index) => {
                if (index < countShowItem) {
                    item.classList.add(classes.active)
                    slideDown(item)
                }
            })

            if (hideItems.length - countShowItem <= 0) {
                slideUp(btnToggle)
            }
        }

        hide()

        more.addEventListener('click', clickBtn)
    })
}

export default More
