const TestWebP = () => {
    const canUseWebP = function () {
        const elem = document.createElement('canvas')

        if (!!(elem.getContext && elem.getContext('2d'))) {
            // was able or not to get WebP representation
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
        }

        // very old browser like IE 8, canvas not supported
        return false
    }

    const isWebpSupported = canUseWebP()

    if (isWebpSupported) {
        document.body.classList.add('js-webp')
        document.body.classList.remove('js-no-webp')

        const lazyItems = document.querySelectorAll('[data-src-webp]')

        for (let i = 0; i < lazyItems.length; i++) {
            const item = lazyItems[i]

            const dataSrcReplaceWebp = item.getAttribute('data-src-webp')
            if (dataSrcReplaceWebp !== null) {
                item.setAttribute('data-src', dataSrcReplaceWebp)
            }
        }
    } else {
        document.body.classList.add('js-no-webp')
        document.body.classList.remove('js-webp')
    }
}
export default TestWebP
