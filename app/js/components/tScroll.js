import { Tu } from '../vendors/t-scroll/t-scroll.js'

const tScroll = () => {
    const tScrollOptions = {
        't-position': 200,
        't-duration': 0.8,
        't-animate': 'fadeIn',
    }
    Tu.tScroll({
        ...tScrollOptions,
        't-element': '.js-t-scroll',
    })
    Tu.tScroll({
        ...tScrollOptions,
        't-element': '.js-t-scroll-up',
        't-animate': 'fadeUp',
    })
    Tu.tScroll({
        ...tScrollOptions,
        't-element': '.js-t-scroll-left',
        't-animate': 'fadeLeft',
    })
    Tu.tScroll({
        ...tScrollOptions,
        't-element': '.js-t-scroll-right',
        't-animate': 'fadeRight',
    })
}

export default tScroll
