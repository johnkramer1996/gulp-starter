import SimpleBar from 'simplebar'

const ScrollSimpleBar = () => {
    const classes = {
        simpleBar: 'js-simpleBar',
    }
    document.querySelectorAll(`.${classes.simpleBar}`).forEach((el) => {
        const simpleBar = new SimpleBar(el)
    })
}

export default ScrollSimpleBar
