import { slideDown, slideUp } from '../utils'

const Accordion = () => {
    const classes = {
        wrap: 'js-accordion',
        item: 'js-accordion-item',
        title: 'js-accordion-title',
        descr: 'js-accordion-descr',
        active: 'js-active',
    }

    document.querySelectorAll(`.${classes.wrap}`).forEach((accordion) => {
        accordion.querySelectorAll(`.${classes.item}`).forEach((el) => !el.classList.contains(classes.active) && (el.querySelector(`.${classes.descr}`).style.display = 'none'))

        accordion.addEventListener('click', (event) => {
            const target = event.target
            const title = target.closest(`.${classes.title}`)

            if (!title) return false
            event.preventDefault()

            const item = target.closest(`.${classes.item}`)
            const isActive = item.classList.contains(classes.active)
            const activeItem = isActive ? item : accordion.querySelector(`.${classes.item}.${classes.active}`)

            if (activeItem) {
                activeItem.classList.remove(classes.active)
                slideUp(activeItem.querySelector(`.${classes.descr}`))
            }

            if (!isActive) {
                item.classList.add(classes.active)
                slideDown(item.querySelector(`.${classes.descr}`))
            }
        })
    })
}

export default Accordion
