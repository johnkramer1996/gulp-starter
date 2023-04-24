const Timer = () => {
    const addZerro = (n, len = 2) => {
        return (new Array(len + 1).join('0') + n).slice(-len)
    }

    document.querySelectorAll('.js-timer').forEach((timer) => {
        const countDownDate = new Date(timer.getAttribute('data-time')).getTime() // April 1, 2021 00:00:00
        const x = setInterval(function () {
            const now = new Date().getTime()
            const distance = countDownDate - now
            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            timer.innerHTML = days + ':' + addZerro(hours) + ':' + addZerro(minutes) + ':' + addZerro(seconds) + ''
            if (distance < 0) {
                clearInterval(x)
                timer.innerHTML = '00:00:00'
            }
        }, 1000)
    })
}

export default Timer
