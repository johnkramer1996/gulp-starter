import { isVisible } from '../utils'
import { scroll } from './ScrollTo'

const Quiz = () => {
    const classes = {
        prev: 'js-quiz-prev',
        next: 'js-quiz-next',
        reset: 'js-quiz-reset',
        number: 'js-quiz-number',
        length: 'js-quiz-length',
        scale: 'js-quiz-scale',
        fillScale: 'js-quiz-scale-fill',
        processing: 'js-quiz-processing',
        fillProcessing: 'js-quiz-processing-fill',
        numberProcessing: 'js-quiz-processing-number',
        halfProcessing: 'js-half',
        anotherInput: 'js-quiz-input-another',
        choice: 'js-quiz-choice',
        activeStep: 'js-step',
        error: 'js-error',
        disabled: 'js-disabled',
        success: 'js-success',
        active: 'js-active',
        checked: 'js-checked',
        another: 'js-another',
        input: 'js-input',
        requiredInput: 'js-input-required',
    }

    class Quiz {
        get activeStep() {
            return this._activeStep || this.$steps[0]
        }

        set activeStep(step) {
            this._activeStep = step
        }

        get indexStep() {
            return this._indexStep
        }

        set indexStep(index) {
            this._indexStep = index
        }

        get nameStep() {
            return this.activeStep.getAttribute(this.attributeStepName)
        }

        constructor(classes) {
            this.classes = classes
            this.isNext = true
            this._activeStep = null
            this._indexStep = 1
            this.attributeStepName = 'data-step'

            this.setup()
            this.setupHandlers()

            this.update()
        }

        setup() {
            this.$quiz = document.querySelector('.js-quiz')
            this.$form = this.$quiz.querySelector('.js-quiz-form')
            this.$steps = [...this.$quiz.querySelectorAll('.js-quiz-step')]
            this.length = this.$steps.length - 2
            this.$inputs = [...this.$quiz.querySelectorAll(`.${classes.input} input`)]
            this.pagination = {
                $pagination: this.$quiz.querySelector('.js-quiz-pagination'),
                $items: [...this.$quiz.querySelectorAll('.js-quiz-pagination-item')],
            }
            this.number = {
                $number: [...this.$quiz.querySelectorAll('.js-quiz-number')],
                $active: [...this.$quiz.querySelectorAll('.js-quiz-number-active')],
                $length: [...this.$quiz.querySelectorAll('.js-quiz-number-length')],
            }
            this.scale = {
                $scale: this.$quiz.querySelector('.js-quiz-scale'),
                $fill: this.$quiz.querySelector('.js-quiz-scale-fill'),
            }
            this.processing = {
                $processing: this.$quiz.querySelector('.js-quiz-processing'),
                $fill: this.$quiz.querySelector('.js-quiz-processing-fill'),
                $number: this.$quiz.querySelector('.js-quiz-processing-number'),
            }
            this.typeChoice = {
                $choice: this.$quiz.querySelector('.js-quiz-choice-type'),
                $img: this.$quiz.querySelector('.js-quiz-choice-img'),
                $title: this.$quiz.querySelector('.js-quiz-choice-val'),
            }

            this.choices = [...this.$quiz.querySelectorAll('.js-quiz-choice')]
                .map(($choice) => {
                    const name = ($choice.dataset.input || 'default').replace(/[^a-zA-Z-1-9]/gi, '')
                    return {
                        $choice,
                        $value: $choice.querySelector('.js-quiz-choice-val'),
                        $inputs: [...this.$quiz.querySelectorAll(`input[data-input=${name}]`)],
                    }
                })
                .filter(({ $value, $inputs }) => $value || $inputs.length)
        }

        setupHandlers() {
            this.$inputs.forEach((input) => {
                const type = input.getAttribute('type')
                const isRadio = type === 'radio'
                const isCheckbox = type === 'checkbox'
                const listener = isRadio || isCheckbox ? 'change' : 'click'
                const name = input.dataset.input
                input.addEventListener(listener, () => this.check())

                if (name === 'type') input.addEventListener('change', () => this.animateType(input))
            })

            const clickBtn = (event) => {
                const btn = event.target.closest(`.${this.classes.prev}, .${this.classes.next}`)
                if (!btn) return
                event.preventDefault()

                if (btn.classList.contains(this.classes.disabled)) return

                this.isNext = btn.classList.contains(this.classes.next)

                this.next()
            }
            this.$quiz.addEventListener('click', clickBtn)

            const clickPagination = (event) => {
                const item = event.target.closest(`.js-quiz-pagination-item.${classes.checked}`)
                if (!item) return
                event.preventDefault()

                this.isNext = false
                const numberStep = +item.getAttribute(this.attributeStepName) || this.pagination.$items.indexOf(item)
                this.next(this.$steps[numberStep], true)
            }
            this.$quiz.addEventListener('click', clickPagination)

            const reset = document.createElement('div')
            reset.classList.add('js-quiz-reset')
            this.$quiz.append(reset)
            const clickReset = (event) => {
                const resetBtn = event.target.closest(`.${this.classes.reset}`)
                if (!resetBtn) return
                event.preventDefault()

                this.reset()
            }
            this.$quiz.addEventListener('click', clickReset)
        }

        update() {
            this.activeStep.querySelectorAll(`.${this.classes.error}`).forEach((input) => input.classList.remove(this.classes.error))

            this.$steps.forEach((el, index) => {
                index < this.indexStep - 1 ? el.classList.add(this.classes.checked) : el.classList.remove(this.classes.checked)
                this.$quiz.classList.remove(this.classes.activeStep + '-' + el.getAttribute(this.attributeStepName))
            })
            this.$quiz.classList.add(this.classes.activeStep + '-' + this.nameStep)

            this.updatePagination()
            this.updateScale()

            switch (this.nameStep) {
                case 'processing':
                    this.runProcessing()
                    break

                default:
                    break
            }

            this.check()
        }

        updatePagination() {
            this.pagination.$items.forEach((el, index) => {
                index === this.indexStep - 1 ? el.classList.add(this.classes.active) : el.classList.remove(this.classes.active)
                index < this.indexStep - 1 ? el.classList.add(this.classes.checked) : el.classList.remove(this.classes.checked)
            })
        }

        updateScale() {
            const { $scale, $fill } = this.scale
            const scalePercent = (100 / this.length) * this.indexStep
            if (scalePercent > 50) $scale.classList.add('js-half')
            else $scale.classList.remove('js-half')
            if ($fill) $fill.style.width = scalePercent + '%'

            const { $active, $length } = this.number
            $active.forEach((el) => (el.textContent = this.indexStep))
            $length.forEach((el) => (el.textContent = this.length))
        }

        next(nextStep) {
            if (!nextStep) nextStep = this.isNext ? this.activeStep.nextElementSibling : this.activeStep.previousElementSibling
            if (!nextStep) return
            if (!this.isNext && nextStep.getAttribute(this.attributeStepName) === 'processing') nextStep = nextStep.previousElementSibling

            this.activeStep.classList.remove(this.classes.active)
            nextStep.classList.add(this.classes.active)
            this.activeStep = nextStep
            this.indexStep = this.$steps.indexOf(nextStep) + 1

            this.update()
            this.scroll(this.$quiz)
        }

        check() {
            this.isNext = true
            this.setChoice()

            const nextBtns = this.activeStep.querySelectorAll(`.${this.classes.next}`)
            if (!nextBtns) return

            const inputs = this.activeStep.classList.contains('js-input') ? [this.activeStep] : [...this.activeStep.querySelectorAll('.js-input')]
            const error = inputs.find((input) => input.classList.contains(this.classes.error))

            if (error) nextBtns.forEach((el) => el.classList.add(this.classes.disabled))
            else nextBtns.forEach((el) => el.classList.remove(this.classes.disabled))
        }

        setChoice() {
            this.choices.forEach(({ $choice, $value, $inputs }) => {
                const values = $inputs
                    .filter((el) => el.checked)
                    .map((el) => el.value)
                    .join(', ')

                const label = $value.dataset.label || ''
                const delay = +$value.dataset.delay || 0

                values ? $choice.classList.add('js-checked') : $choice.classList.remove('js-checked')
                setTimeout(() => ($value.innerHTML = values ? values + ' ' + label : ''), delay)
            })
        }

        runProcessing() {
            const { $processing, $fill, $number } = this.processing
            if (!($processing && $fill && $number)) return

            $processing.classList.remove('js-half')

            const addPercent = (percent = 0) => {
                percent += this.random(5, 15)

                if (percent > 50) $processing.classList.add('js-half')
                if (percent < 100) {
                    setTimeout(() => addPercent(percent), this.random(100, 250))
                } else {
                    percent = 100
                    setTimeout(() => this.next(), 300)
                }

                if ($fill && $number) $fill.style.width = $number.textContent = percent + '%'
            }

            addPercent()
        }

        animateType(input) {
            const { $choice, $img, $title } = this.typeChoice
            if (!($choice && $img && $title)) return

            const $currentInput = input.closest('.input')
            const { top: inputTop, left: inputLeft } = $currentInput.getBoundingClientRect()
            const { top: choiceTop, left: choiceLeft } = $choice.getBoundingClientRect()
            const value = input.dataset.value || ''
            const $animateBlock = document.createElement('div')
            const $animateImage = document.createElement('span')
            const $animateTitle = document.createElement('span')

            $choice.classList.add('js-changing')
            $animateBlock.classList.add('quiz__choice-type', 'js-animation')
            $animateImage.classList.add('quiz__choice-img', 'img')
            $animateTitle.classList.add('quiz__choice-label')

            // start state
            $animateBlock.style.left = window.pageXOffset + inputLeft + 'px'
            $animateBlock.style.top = window.pageYOffset + inputTop + 'px'
            $animateBlock.style.width = $currentInput.clientWidth + 'px'
            $animateBlock.style.height = $currentInput.clientHeight + 'px'
            $animateImage.style.backgroundImage = `url(${input.getAttribute('data-image')})`
            $animateTitle.textContent = value

            $animateBlock.append($animateImage)
            $animateBlock.append($animateTitle)
            document.body.append($animateBlock)

            // finish state
            $animateBlock.style.left = window.pageXOffset + choiceLeft + 'px'
            $animateBlock.style.top = window.pageYOffset + choiceTop + 'px'
            $animateBlock.style.width = $choice.clientWidth + 'px'
            $animateBlock.style.height = $choice.clientHeight + 'px'

            setTimeout(() => {
                $img.style.backgroundImage = `url(${input.getAttribute('data-image')})`
                $animateBlock.classList.add('js-deleting')
                $choice.classList.remove('js-changing')
                setTimeout(() => $animateBlock.remove(), 500)
            }, 1000)

            return
        }

        scroll($quiz) {
            scroll($quiz)
        }

        isVisible($quiz) {
            return $quiz ? isVisible($quiz) : false
        }

        random(min, max) {
            return Math.round(min + Math.random() * (max - min))
        }

        reset() {
            const activeStep = this.activeStep
            const nextStep = this.$steps[0]
            if (activeStep === nextStep) return
            this.$form.reset()
            this.next(nextStep)
            this.update()
        }
    }

    const quiz = new Quiz(classes)
}

export default Quiz
