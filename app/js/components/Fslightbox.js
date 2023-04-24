require('fslightbox')

const Fslightbox = () => {
    Object.keys(fsLightboxInstances).forEach((key) => {
        fsLightboxInstances[key].props.onClose = () => {
            fsLightboxInstances[key].data.isFullscreenOpen = false
            document.fullscreenElement && document.exitFullscreen()
        }

        fsLightboxInstances[key].props.onOpen = () => {}
    })

    document.querySelectorAll('a[data-fslightbox]').forEach((el) => {
        el.addEventListener('click', (event) => {
            event.preventDefault()

            const href = el.getAttribute('href')
            const fslightboxName = el.dataset.fslightbox

            const number = fsLightboxInstances[fslightboxName].props.sources.indexOf(href)

            fsLightboxInstances[fslightboxName].open(number)
        })
    })
}

export default Fslightbox
