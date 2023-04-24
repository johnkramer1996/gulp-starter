const InputCount = () => {
    const classes = {
        wrap: 'js-input-count',
        minus: 'js-input-count-minus',
        plus: 'js-input-count-plus',
        input: 'js-input-count-input',
    }

    document.querySelectorAll(`.${classes.wrap}`).forEach((count) => {
        const input = count.querySelector(`.${classes.input}`)

        const clickBtn = () => {
            const target = event.target
            const btn = target.closest(`.${classes.plus}, .${classes.minus}`)
            if (!btn) return
            event.preventDefault()

            let value = +input.value

            if (btn.classList.contains(classes.plus)) value++
            else value--

            input.value = value ? value : 1
        }

        const onlyNumber = (event) => (event.target.value = event.target.value.replace(/\D/g, ''))

        const notEmpty = (event) => (event.target.value = !event.target.value ? 1 : event.target.value)

        count.addEventListener('click', clickBtn)
        input.addEventListener('input', onlyNumber)
        input.addEventListener('change', notEmpty)
    })
}

export default InputCount
