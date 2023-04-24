const InputRange = () => {
    const classes = {
        wrap: 'js-input-range',
        input: 'js-input-range-input',
        range: 'js-input-range-range',
        line: 'js-input-range-line',
    }

    document.querySelectorAll(`.${classes.wrap}`).forEach((inputRange) => {
        const form = inputRange.closest('form')
        const input = inputRange.querySelector(`.${classes.input}`)
        const range = inputRange.querySelector(`.${classes.range}`)
        const line = inputRange.querySelector(`.${classes.line}`)
        const minValue = range ? +range.getAttribute('min') : 0
        const maxValue = range ? +range.getAttribute('max') : 0
        const rangeValue = range.value

        const setValue = (value) => {
            line.style.width = (value > minValue ? ((value - minValue) / (maxValue - minValue)) * 100 : '0') + '%'
            range.value = input.value = value
        }

        range.addEventListener('input', () => setValue(+range.value))

        input.addEventListener('input', () => {
            let value = +input.value

            if (value > maxValue) value = maxValue

            setValue(value)
        })

        input.addEventListener('change', () => {
            let value = +input.value

            if (value > maxValue) value = maxValue
            else if (value < minValue) value = minValue

            setValue(value)
        })

        setValue(rangeValue)

        form?.addEventListener('reset', () => setTimeout(() => setValue(minValue), 0))
    })
}

export default InputRange
