import LazyLoad from 'vanilla-lazyload'

const LazyLoadImg = () => {
    const lazyLoadInstance = new LazyLoad({
        elements_selector: '.js-lazy',
        data_bg: 'src',
    })
}

export default LazyLoadImg
