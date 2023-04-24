import { popup } from '../utils'

const classes = {
    content: 'js-popup-content',
    open: 'js-popup-open',
    close: 'js-popup-close',
    video: 'js-popup-video',
    title: 'js-popup-title',
    subtitle: 'js-popup-subtitle',
    formName: 'js-popup-form-name',
    btn: 'js-popup-btn',
    activeBody: 'js-popup-active',
    active: 'js-active',
}

const Popup = () => {
    popup.querySelectorAll(`.${classes.content}`).forEach((popupContent) => (popupContent.style.display = 'none'))

    const clickOpen = (event) => {
        const target = event.target
        const button = target.closest(`.${classes.open}`)

        if (!button) return
        event.preventDefault()

        const hrefPopup = button.getAttribute('href')
        const srcVideo = button.getAttribute('data-video')
        const currentPopup = popup.querySelector(hrefPopup)

        if (!currentPopup) return

        const title = currentPopup.querySelector(`.${classes.title}`)
        const subtitle = currentPopup.querySelector(`.${classes.subtitle}`)
        const formName = currentPopup.querySelector(`.${classes.formName}`)
        const btn = currentPopup.querySelector(`.${classes.btn}`)
        const popupVideo = currentPopup.querySelector(`.${classes.video}`)

        const valueTitleDefault = title && title.getAttribute('data-default')
        const valueSubtitleDefault = subtitle && subtitle.getAttribute('data-default')
        const valueFormNameDefault = formName && formName.getAttribute('data-default')
        const valueBtnDefault = btn?.getAttribute('data-default')

        const valueTitle = button.getAttribute('data-title') ? button.getAttribute('data-title') : valueTitleDefault
        const valueSubtitle = button.getAttribute('data-subtitle') ? button.getAttribute('data-subtitle') : valueSubtitleDefault
        const valueFormName = button.getAttribute('data-form') ? button.getAttribute('data-form') : valueFormNameDefault
        const valueBtn = button?.getAttribute('data-btn') || valueBtnDefault

        if (valueTitle && title) title.innerHTML = valueTitle
        if (valueSubtitle && subtitle) subtitle.innerHTML = valueSubtitle
        if (valueFormName && formName) formName.value = valueFormName
        if (valueBtn && btn) btn.innerHTML = valueBtn

        if (srcVideo && popupVideo)
            popupVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${srcVideo}?autoplay=1&amp;rel=0&amp;showinfo=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

        openPopup(currentPopup)
    }

    const clickClose = (event) => {
        const target = event.target
        const close = target.closest(`.${classes.close}`)

        if (!close) return
        event.preventDefault()
        closePopup()
    }

    document.body.addEventListener('click', clickOpen)
    document.body.addEventListener('click', clickClose)

    document.body.addEventListener('keydown', (event) => {
        if (event.keyCode !== 27) return
        closePopup()
    })
}

export const closePopup = () => {
    const activePopup = popup.querySelector(`.${classes.content}.${classes.active}`)
    if (activePopup) {
        if (activePopup.getAttribute('id') === 'popup-video') {
            activePopup.querySelector('.js-popup-video').innerHTML = ''
        }
        activePopup.classList.remove(classes.active)
        activePopup.querySelectorAll('.js-input.js-error').forEach((el) => el.classList.remove('js-error'))
    }
    popup.classList.remove(classes.active)
    document.body.classList.remove(classes.activeBody)
}

export const openPopup = (popupItem) => {
    if (!popupItem) return
    closePopup()
    popupItem.classList.add(classes.active)
    popup.classList.add(classes.active)

    document.body.classList.add(classes.activeBody)
}

export default Popup
