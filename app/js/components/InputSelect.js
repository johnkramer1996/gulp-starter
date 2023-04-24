import Choices from 'choices.js'

const InputSelect = () => {
    const classes = {
        select: 'js-input-select',
    }

    document.querySelectorAll(`.${classes.select}`).forEach(
        (select) =>
            new Choices(select, {
                itemSelectText: '',
                searchEnabled: false,
                shouldSort: false,
            }),
    )
}

export default InputSelect
