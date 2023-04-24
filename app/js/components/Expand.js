const Expand = () => {
    const classes = {
        wrap: 'js-expand',
        hidden: 'js-expand-hidden',
        btn: 'js-expand-btn',
    }

    document.querySelectorAll(`.${classes.wrap}`).forEach((wrap) => {
        const hidden = wrap.querySelectorAll(`.${classes.hidden}`)

        if (!hidden) {
            btn.style.display = 'none'
            return
        }

        hidden.forEach((el) => (el.style.display = 'none'))

        const clickBtn = (event) => {
            const target = event.target
            const btn = target.closest(`.${classes.btn}`)

            if (!btn) return false
            event.preventDefault()

            hidden.forEach((el) => (el.tagName.toLocaleLowerCase() === 'span' ? (el.style.display = 'inline') : (el.style.display = 'block')))
            btn.style.display = 'none'
        }

        wrap.addEventListener('click', clickBtn)
    })
}

export default Expand
