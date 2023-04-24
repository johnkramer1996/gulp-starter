const InputFile = () => {
    const classes = {
        wrap: 'js-input-file',
        inputParent: 'js-input',
        input: 'js-input-file-input',
        name: 'js-input-file-name',
        img: 'js-input-file-img',
        delete: 'js-input-file-delete',
        error: 'js-input-file-error',
    }

    document.querySelectorAll(`.${classes.wrap}`).forEach((inputFile) => {
        const form = inputFile.closest('form')
        const inputParent = inputFile.closest(`.${classes.inputParent}`)
        const input = inputFile.querySelector(`.${classes.input}`)
        const name = inputFile.querySelector(`.${classes.name}`)
        const img = inputFile.querySelector(`.${classes.img}`)
        const deleteButton = inputFile.querySelector(`.${classes.delete}`)
        const error = inputFile.querySelector(`.${classes.error}`)

        const maxSize = inputFile.getAttribute('data-max-size')
        const validType = inputFile?.getAttribute('data-file-valid').split(', ')

        const imgType = 'png, jpg, jpeg'

        const update = (fileName) => {
            if (!fileName) fileName = inputFile.getAttribute('data-default')
            inputFile.classList.remove('js-active', 'js-error-file')
            if (inputFile.classList.contains('js-input-required')) inputParent.classList.remove('js-error', 'js-success')
            if (name) name.innerHTML = fileName
            if (img) img.setAttribute('style', '')
        }

        const fileError = (errorText, isUpdate = true) => {
            if (isUpdate) {
                update()
                input.value = ''
            }

            inputFile.classList.add('js-error-file')
            if (error) error.textContent = errorText
        }

        input.addEventListener('change', (event) => {
            const splittedFakePath = input.value.split('\\')
            const fileName = splittedFakePath[splittedFakePath.length - 1]
            const files = input.files
            const size = (files[0] && files[0].size) || 0
            const idxDot = fileName.lastIndexOf('.') + 1
            const extFile = fileName.substr(idxDot, fileName.length).toLowerCase()

            update(fileName)

            if (extFile === '') {
                if (input.classList.contains('js-input-required')) {
                    inputParent.classList.add('js-error')
                    fileError('*Обязательное поле')
                }

                return
            }

            if (!validType || !validType?.includes(extFile)) {
                fileError('*Недопустимый формат')

                return
            }

            if (size > maxSize * 1024 * 1024) {
                fileError('*Слишком большой файл')

                return
            }

            if (imgType?.includes(extFile) && files && files[0]) {
                const reader = new FileReader()

                reader.onload = (event) => {
                    inputFile.classList.add('js-active')
                    img && img.setAttribute('style', `background-image: url(${event.target.result})`)
                }

                reader.readAsDataURL(files[0])
            }

            inputParent.classList.add('js-success')
        })

        input.addEventListener('click', (event) => {
            input.value = ''
            update()
        })

        deleteButton?.addEventListener('click', (event) => {
            input.value = ''
            input.dispatchEvent(new Event('change'))
            update()
        })

        form?.addEventListener('reset', () => setTimeout(() => deleteButton.click(), 0))
    })
}

export default InputFile
