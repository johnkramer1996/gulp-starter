'use strict'

import * as components from './components/'

document.addEventListener('DOMContentLoaded', () => {
    ;[...Object.values(components)].forEach((el) => el())
    document.body.classList.remove('js-loading')
})
