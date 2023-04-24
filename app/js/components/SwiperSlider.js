import Swiper, { Navigation, Pagination, Thumbs } from 'swiper'
import { gridBreakpoints } from '../utils'

const SwiperSlider = () => {
    Swiper.use([Navigation, Pagination, Thumbs])

    const defaultOption = {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        watchOverflow: true,
        watchSlidesVisibility: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    }

    const slidesPerViewTree = {
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
    }

    const slidesPerViewFour = {
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 4,
    }

    const swiperGallery = new Swiper('.js-swiper-gallery', {
        ...defaultOption,
    })

    const swiperTeam = new Swiper('.js-swiper-team', {
        ...defaultOption,
        spaceBetween: 0,
        breakpoints: {
            [gridBreakpoints.xs]: {
                slidesPerView: slidesPerViewTree.xs,
            },
            [gridBreakpoints.sm]: {
                slidesPerView: slidesPerViewTree.sm,
            },
            [gridBreakpoints.md]: {
                slidesPerView: slidesPerViewTree.md,
            },
            [gridBreakpoints.lg]: {
                slidesPerView: slidesPerViewTree.lg,
            },
            [gridBreakpoints.xl]: {
                slidesPerView: slidesPerViewTree.xl,
            },
        },
    })

    // const swiperGalleryThumbs = new Swiper('.js-swiper-card-thumps', {
    //     ...defaultOption,
    //     loop: false,
    //     slidesPerView: 4,
    //     freeMode: true,
    //     watchSlidesVisibility: true,
    //     watchSlidesProgress: true,
    // })

    // const swiperCard = new Swiper('.js-swiper-card', {
    //     ...defaultOption,
    //     thumbs: {
    //         swiper: swiperGalleryThumbs,
    //     },
    // })
}

export default SwiperSlider
