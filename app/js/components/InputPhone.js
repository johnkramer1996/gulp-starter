import InputMask from 'inputmask'

const InputPhone = () => {
    const classes = {
        phone: 'js-input-phone',
    }
    const phoneMask = '+7 (999) 999 99 99'
    const inputMaskInstance = new Inputmask(phoneMask).mask(document.querySelectorAll(`.${classes.phone}`))

    // document.querySelectorAll(`.${classes.phone}`).forEach((input) => {
    //     const phoneMask1 = IMask(input, {
    //         mask: '+{7}(000)000-00-00',
    //         lazy: false, // make placeholder always visible
    //         placeholderChar: '_', // defaults to '_'
    //     })
    // })
}

export default InputPhone
