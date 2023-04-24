'use strict'

const gulp = require('gulp')
const { src, dest, parallel, series, watch } = require('gulp')
const browsersync = require('browser-sync').create()
const webpack = require('webpack-stream')
const fileinclude = require('gulp-file-include')
const del = require('del')
const scss = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const clean_css = require('gulp-clean-css')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const webp = require('gulp-webp')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const fonter = require('gulp-fonter')
const uglify = require('gulp-uglify-es').default
const beautify = require('gulp-beautify')
const fs = require('fs')

const projectFolder = 'dist'
const sourceFolder = 'app'

const path = {
    build: {
        html: projectFolder + '/',
        css: projectFolder + '/css/',
        js: projectFolder + '/js/',
        img: projectFolder + '/img/',
        fonts: projectFolder + '/fonts/',
        files: projectFolder + '',
    },
    src: {
        html: [sourceFolder + '/*.{html,php}', '!' + sourceFolder + '/_*.{html,php}'],
        css: sourceFolder + '/scss/style.scss',
        js: sourceFolder + '/js/script.js',
        img: [sourceFolder + '/img/**/*.*', '!' + sourceFolder + '/img/**/*.svg'],
        fonts: sourceFolder + '/fonts/*.ttf',
        files: sourceFolder + '/files/**/*.*',
    },
    watch: {
        html: sourceFolder + '/**/*.{html,php}',
        css: sourceFolder + '/scss/**/*.scss',
        js: sourceFolder + '/js/**/*.js',
        img: sourceFolder + '/img/**/*.*',
        fonts: sourceFolder + '/fonts/**/*.*',
        files: sourceFolder + '/files/**/*.*',
    },
    clean: './' + projectFolder + '/',
}

function browserSync() {
    return browsersync.init({
        // proxy: 'siteName', // for server
        server: {
            baseDir: './' + projectFolder + '/',
        },
        port: 3000,
        notify: false,
    })
}

function html() {
    return (
        src(path.src.html)
            .pipe(fileinclude())
            // .pipe(beautify.html({ indent_size: 2 }))
            .pipe(dest(path.build.html))
            .pipe(browsersync.stream())
    )
}

function css() {
    return (
        src(path.src.css)
            .pipe(
                scss({
                    outputStyle: 'expanded',
                }),
            )
            // .pipe(
            //     autoprefixer({
            //         overrideBrowserslist: ['last 5 versions'],
            //         grid: true,
            //         cascade: true,
            //     }),
            // )
            .pipe(dest(path.build.css))
            // .pipe(clean_css())
            .pipe(
                rename({
                    extname: '.min.css',
                }),
            )
            .pipe(dest(path.build.css))
            .pipe(browsersync.stream())
    )
}

function js() {
    return src(path.src.js)
        .pipe(
            webpack({
                // mode: 'production',
                mode: 'development',
                module: {
                    rules: [
                        {
                            test: /\.(js)$/,
                            exclude: /(node_modules)/,
                            loader: 'babel-loader',
                            query: {
                                presets: ['@babel/env'],
                            },
                        },
                    ],
                },
                output: {
                    filename: 'script.js',
                    // filename: 'script.min.js',
                },
                optimization: {
                    minimize: false,
                },
            }),
        )
        .on('error', function handleError() {
            this.emit('end')
        })
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js',
            }),
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    src(sourceFolder + '/img/**/*.svg')
        .pipe(newer(path.build.img))
        .pipe(dest(path.build.img))

    return (
        src(path.src.img)
            .pipe(newer(path.build.img))
            .pipe(
                webp({
                    quality: 90,
                }),
            )
            .pipe(src(path.src.img))
            // .pipe(
            //     imagemin({
            //         progressive: true,
            //         svgoPlugins: [{ removeViewBox: false }],
            //         interlaced: true,
            //         optimizationLevel: 5, // 0 to 7
            //     }),
            // )
            .pipe(dest(path.build.img))
    )
}

function fonts() {
    src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts))
    return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts)).pipe(browsersync.stream())
}

function files() {
    return src(path.src.files).pipe(gulp.dest(path.build.files)).pipe(browsersync.stream())
}

function fontsStyle() {
    const fileContent = fs.readFileSync(sourceFolder + '/scss/_fonts.scss', { encoding: 'utf8' })
    if (!fileContent || fileContent) {
        const items = fs.readdirSync(path.build.fonts)
        const fonts = []
        const uniqueFonst = new Set()
        const parseFont = (fontname) => {
            const fontsWeightAll = [
                ['100', 'Thin'],
                ['200', 'ExtraLight', 'UltraLight'],
                ['300', 'Light'],
                ['400', 'Regular', 'Normal'],
                ['500', 'Medium'],
                ['600', 'SemiBold', 'DemiBold'],
                ['700', 'Bold'],
                ['800', 'ExtraBold', 'UltraBold'],
                ['900', 'Black', 'Heavy'],
                ['950', 'ExtraBlack', 'UltraBlack'],
            ]
            const style = fontname.toLowerCase().includes('italic') ? 'italic' : 'normal'
            const returnFont = [fontname, fontname, '400', style]
            for (const fontsWeight of fontsWeightAll) {
                for (const weight of fontsWeight) {
                    const indexStartWeight = fontname.indexOf(weight)
                    if (~indexStartWeight) {
                        returnFont[0] = fontname.slice(0, indexStartWeight)
                        returnFont[2] = fontsWeight[0]
                        break
                    }
                }
            }
            return [returnFont[0].replace(/italic\w*/gi, ''), returnFont[1], returnFont[2], returnFont[3]]
        }
        const fontsStrBuild = (fonts) =>
            fonts
                .sort((fontA, fontB) => fontA[2] - fontB[2])
                .reduce((acum, [fontname, font, weight, style]) => acum + '@include font("' + fontname + '", "' + font + '", "' + weight + '", "' + style + '");\r\n', '')

        for (const item of items) {
            const [fontname] = item.split('.')
            if (uniqueFonst.has(fontname)) continue
            uniqueFonst.add(fontname)
            fonts.push(parseFont(fontname))
        }

        fs.appendFile(sourceFolder + '/scss/_fonts.scss', fontsStrBuild(fonts), () => {})
    }
    return Promise.resolve('ok')
}

function watchFiles() {
    watch([path.watch.html], html)
    watch([path.watch.css], css)
    watch([path.watch.js], js)
    watch([path.watch.img], images)
    watch([path.watch.fonts], fonts)
    watch([path.watch.files], files)
}

function clean() {
    return del(path.clean + '/', { force: true })
}

const build = series(clean, parallel(js, css, html, images, fonts, files), fontsStyle)
const watchfiles = parallel(build, watchFiles, browserSync)

exports.clean = clean
exports.files = files
exports.fontsStyle = fontsStyle
exports.fonts = fonts
exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watchfiles
exports.default = watchfiles
