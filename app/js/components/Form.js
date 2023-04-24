import { checkInput, debounce } from '../utils'
import { openPopup } from './Popup'

const Form = () => {
    const classes = {
        form: 'js-form',
        input: 'js-input',
        error: 'js-error',
        required: 'js-input-required',
        select: 'js-input-select',
    }
    const mailUrl = 'mail/mail.php'
    const defaultThanks = '#popup-thanks'
    const defaultTimeout = 0

    document.querySelectorAll(`.${classes.required}`).forEach((input) => {
        const parentInput = input.closest(`.${classes.input}`)

        if (!parentInput) return
        const removeErrorClass = () => parentInput.classList.remove(classes.error)

        input.addEventListener('focus', removeErrorClass)
        input.addEventListener('blur', () => checkInput(input))
        input.addEventListener('change', () => checkInput(input))
        input.addEventListener(
            'input',
            debounce(() => checkInput(input), 1000),
        )

        if (input.classList.contains('js-input-massanger')) {
            const changeMessenger = () => {
                const isMail = input.dataset.isMail
                isMail === 'true' ? parentInput.nextElementSibling.classList.remove('js-hidden') : parentInput.nextElementSibling.classList.add('js-hidden')
            }

            input.addEventListener('change', changeMessenger)
        }
    })

    const submitForm = (event) => {
        event.preventDefault()

        const form = event.target
        const isQuiz = form.classList.contains('js-quiz-form')
        const thanks = form.getAttribute('data-thanks') || defaultThanks
        const timeout = parseInt(form.getAttribute('data-timeout')) || defaultTimeout
        const file = form.getAttribute('data-file')

        const inputRequired = !isQuiz ? form.querySelectorAll(`.${classes.required}`) : form.querySelectorAll(`.js-quiz-step.js-active .${classes.required}`)

        inputRequired.forEach((input) => checkInput(input))

        const data = new FormData(form)
        const xhr = new XMLHttpRequest()
        const url = mailUrl

        if (form.querySelector(`.${classes.error}`)) return

        const button = [...form.querySelectorAll('button')].reverse()[0]
        button.setAttribute('disabled', 'disabled')
        button.classList.add('js-loading')

        xhr.open('POST', url)
        xhr.onload = function () {
            const downloadFile = (file) => {
                const link = document.createElement('a')
                link.setAttribute('download', file)
                link.href = file
                document.body.appendChild(link)
                link.click()
                link.remove()
            }

            const success = () => {
                file && downloadFile(file)
                button.removeAttribute('disabled')
                button.classList.remove('js-loading')

                if (thanks !== 'none') {
                    if (thanks.includes('#')) openPopup(document.querySelector(thanks))
                    else document.location.href = thanks
                }

                if (isQuiz) form.closest('.js-quiz')?.querySelector('.js-quiz-reset')?.click()
                else form.reset()
                form.querySelectorAll('.js-success').forEach((el) => el.classList.remove('js-success'))
            }

            setTimeout(success, timeout)
        }
        xhr.send(data)
    }

    document.querySelectorAll(`.${classes.form}`).forEach((form) => form.addEventListener('submit', submitForm))
}

export default Form
