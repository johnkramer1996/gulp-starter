import { loadScript } from '../utils'

const Map = () => {
    window.onload = () => {
        setTimeout(() => loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1', initMap), 3000)
        const initMap = () => {
            ymaps.ready(() => {
                document.querySelectorAll('.js-map').forEach((map) => {
                    const idMap = map.getAttribute('id')
                    const [centerCoordsX, centerCoordsY] = [...map.getAttribute('data-coords-center').split(',')]
                    const [offsetCoordsX, offsetCoordsY] = [...map.getAttribute('data-coords-offset').split(',')]
                    if (!centerCoordsX || !centerCoordsY) return
                    if (!offsetCoordsX || !offsetCoordsY) return

                    const myMap = new ymaps.Map(idMap, {
                        center: [centerCoordsX - offsetCoordsX, centerCoordsY - offsetCoordsY],
                        zoom: 14,
                        controls: ['zoomControl'],
                    })
                    myMap.behaviors.disable('scrollZoom')
                    const isDrag = map.getAttribute('data-drag') === 'false'
                    if (isDrag) myMap.behaviors.disable('drag')

                    map.getAttribute('data-coords')
                        .split('|')
                        .forEach((coords) => {
                            const myPlacemark = new ymaps.Placemark(
                                [...coords.split(',')],
                                {
                                    hintContent: '',
                                    balloonContent: '',
                                },
                                {
                                    iconLayout: 'default#image',
                                    iconImageHref:
                                        "data:image/svg+xml,%3Csvg width='21' height='29' viewBox='0 0 21 29' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.5 0.9375C5.15189 0.9375 0.8125 4.84338 0.8125 9.65625C0.8125 17.4062 10.5 28.0625 10.5 28.0625C10.5 28.0625 20.1875 17.4062 20.1875 9.65625C20.1875 4.84338 15.8481 0.9375 10.5 0.9375ZM10.5 14.5C9.7336 14.5 8.98441 14.2727 8.34717 13.8469C7.70993 13.4212 7.21326 12.816 6.91997 12.1079C6.62668 11.3998 6.54994 10.6207 6.69946 9.86903C6.84897 9.11735 7.21803 8.42689 7.75996 7.88496C8.30189 7.34303 8.99235 6.97397 9.74403 6.82446C10.4957 6.67494 11.2748 6.75168 11.9829 7.04497C12.691 7.33826 13.2962 7.83493 13.7219 8.47217C14.1477 9.10941 14.375 9.8586 14.375 10.625C14.3739 11.6524 13.9653 12.6373 13.2388 13.3638C12.5123 14.0903 11.5274 14.4989 10.5 14.5Z' fill='white'/%3E%3C/svg%3E%0A",
                                    iconImageSize: [21, 29],
                                    iconImageOffset: [-11, -29],
                                },
                            )
                            myMap.geoObjects.add(myPlacemark)
                        })
                })
            })
        }
    }
}

export default Map
