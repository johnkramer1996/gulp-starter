export const Tu = {
    tScroll: function tScroll(options) {
        var myArray = []
        var libArray = ['t-element', 't-animate', 't-position', 't-delay', 't-direction', 't-duration', 't-count', 't-function']
        libArray.forEach(function (el) {
            myArray.push(options[el])
        })
        var objCheck = checkValueInput.apply(objCheck, myArray)
    },
}
function checkValueInput(pr_el, pr_ani, pr_position, pr_delay, pr_direction, pr_duration, pr_count, pr_timing_function) {
    var elment_select_html = document.querySelectorAll(pr_el)
    elment_select_html = [].slice.call(elment_select_html)
    if (pr_el === undefined) {
        return console.log("%c'Thank you for using tScroll. Please, insert property for element selector t-element: 'element here'", 'background: #f16d99; color: #fff')
    }
    pr_el.split(' ').forEach(function (el) {
        if (el.slice(0, 1) != '.' && el.slice(0, 1) != '#') {
            return console.log("%c'Thank you for using tScroll. Please, insert property for element selector t-element: '.' or '#'", 'background: #f16d99; color: #fff')
        }
    })
    if (pr_el === '.t-default' && pr_ani === undefined) {
        return console.log("%c'Thank you for using tScroll. Please, insert property for element selector t-animate: 'options here'", 'background: #f16d99; color: #fff')
    }
    if (pr_position != undefined && pr_position != 'top' && pr_position != 'bottom' && typeof pr_position != 'number') {
        return console.log("%c'Thank you for using tScroll. Please, insert property for element selector t-position: 'number or string top, bottom here'", 'background: #f16d99; color: #fff')
    }
    if ((pr_position != undefined && pr_position === 'top') || pr_position === undefined) {
        pr_position = 0
    }
    if (pr_position != undefined && pr_position === 'bottom') {
        elment_select_html.forEach(function (e) {
            pr_position = e.offsetHeight
        })
    }
    if (pr_delay != undefined && typeof pr_delay === 'string') {
        return console.log("%c'Thank you for using tScroll. Please, insert property for element selector t-delay: 'number here'", 'background: #f16d99; color: #fff')
    }
    if (pr_direction != undefined) {
        elment_select_html.forEach(function (e) {
            e.style.animationDirection = pr_direction
            e.style.WebkitAnimationDirection = pr_direction
        })
    }
    if (pr_duration != undefined && typeof pr_duration === 'string') {
        return console.log("%c'Thank you for using tScroll. Please, insert property for element selector t-duration: 'number here'", 'background: #f16d99; color: #fff')
    }
    if (pr_duration != undefined) {
        elment_select_html.forEach(function (e) {
            pr_duration = pr_duration
            e.style.animationDuration = pr_duration + 's'
            e.style.WebkitAnimationDuration = pr_duration + 's'
        })
    } else {
        elment_select_html.forEach(function (e) {
            pr_duration = 0.25
        })
    }
    if (pr_count != undefined) {
        elment_select_html.forEach(function (e) {
            e.style.animationIterationCount = pr_count
            e.style.WebkitAnimationIterationCount = pr_count
        })
    }
    if (pr_timing_function != undefined) {
        elment_select_html.forEach(function (e) {
            e.style.animationTimingFunction = pr_timing_function
            e.style.WebkitAnimationTimingFunction = pr_timing_function
        })
    }
    var myArray = [pr_el, pr_ani, pr_position, pr_delay, pr_direction, pr_duration, pr_count, pr_timing_function]
    var myObject = include.apply(myObject, myArray)
}
function include(pr_el, pr_ani, pr_position, pr_delay, pr_direction, pr_duration, pr_count, pr_timing_function) {
    var set_w_height = window.innerHeight
    var elment_select_html = document.querySelectorAll(pr_el)
    elment_select_html = [].slice.call(elment_select_html)
    elment_select_html.forEach(function (e) {
        e.style.opacity = 1e-7 * pr_position
        if (e.classList.contains('t-animated') && e.hasAttribute('data-t-show') === false) {
            var class_animation_css = e.className + ' ' + pr_ani + ' ' + 't-default'
            setTimeout(function () {
                e.setAttribute('class', class_animation_css)
                e.style.opacity = 1
            }, pr_delay * 1000)
        }
        if (e.hasAttribute('data-t-show') === true && e.getAttribute('data-t-show') === '') {
            e.setAttribute('data-t-show', 1)
        }
        if (e.hasAttribute('data-t-show') === true && pr_duration != undefined && e.classList.contains('t-animated')) {
            if (pr_delay === undefined) {
                pr_delay = 0
            }
            var num = Number(e.getAttribute('data-t-show'))
            var pr_delay_r = pr_duration * num + (pr_delay - pr_duration)
            var class_animation_css = e.className + ' ' + 't-default'
            setTimeout(function () {
                e.setAttribute('class', class_animation_css)
                e.style.opacity = 1
            }, pr_delay_r * 1000)
        }
    })
    window.addEventListener('scroll', function () {
        var set_top = window.scrollY
        elment_select_html.forEach(function (e) {
            pr_position = e.style.opacity * 10000000
            var rect = e.getBoundingClientRect()
            var sum = set_top + rect.top
            if (set_top + set_w_height - pr_position > sum && !e.classList.contains('t-animated')) {
                var num = Number(e.getAttribute('data-t-show'))
                if (pr_delay === undefined) {
                    pr_delay = 0
                }
                var pr_delay_r = pr_delay
                if (e.hasAttribute('data-t-show') === true) {
                    pr_delay_r = pr_duration * num + (pr_delay - pr_duration)
                }
                var class_animation_css = e.className + ' ' + pr_ani + ' ' + 't-animated t-default'
                setTimeout(function () {
                    e.setAttribute('class', class_animation_css)
                    e.style.opacity = 1
                }, pr_delay_r * 1000)
            }
        })
    })
}
