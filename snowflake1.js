/**!
    Source: https://github.com/nextapps-de/snowflake
    License: Apache License 2.0
*/

;(function (window, document) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let style = canvas.style
    let width, height, count
    let snowflakes, snowflake

    style.position = 'fixed'
    style.top = '0'
    style.left = '0'
    style.width = '100%'
    style.height = '100%'
    style.zIndex = '999999'
    style.pointerEvents = 'none'

    /**
     * @constructor
     */

    function Snowflake(options = {}) {
        let defaultOptions = { scale: 0.2, speed: 1, opacity: 0 }
        options = { ...defaultOptions, ...options }
        this.x = randomize(width)
        this.y = randomize(height * -1)
        // this.scale = scale
        this.scale = 0.2
        this.opacity = options.opacity || 0.3 + randomize(0.7) // 透明度
        this.vy = 1 * options.speed + randomize(3) // y轴速度
        this.vx = 0.5 * options.speed - randomize() // x轴速度
    }

    function init(callback) {
        console.log('count', count)
        snowflakes = new Array(count)

        let img = new Image()
        this.__img = img
        img.src = './snow.png'
        img.onload = () => {
            for (let i = 0; i < count; i++) {
                snowflakes[i] = new Snowflake()
            }
            callback(img)
        }
    }

    function update(img) {
        window.requestAnimationFrame(() => {
            update(img)
        })

        ctx.clearRect(0, 0, width, height)

        for (let i = 0; i < count; i++) {
            snowflake = snowflakes[i]
            snowflake.y += snowflake.vy
            snowflake.x += snowflake.vx

            if (snowflake.y > height || snowflake.x > width || snowflake.x < 0) {
                snowflakes[i] = new Snowflake()
            } else if (snowflake.y > 0) {
                ctx.globalAlpha = snowflake.opacity
                ctx.beginPath()
                ctx.drawImage(img, snowflake.x, snowflake.y, img.width * snowflake.scale, img.height * snowflake.scale)
                ctx.closePath()
                ctx.fill()
            }
        }
    }

    function resize() {
        let element = document.documentElement,
            body = document.body

        width = window.innerWidth || element.clientWidth || body.clientWidth
        height = window.innerHeight || element.clientHeight || body.clientHeight
        count = ((width * height) / 7500) >> 0

        canvas.width = width
        canvas.height = height
        ctx.fillStyle = '#FFF'
    }

    /**
     * @param {number=} bound
     * @returns {number}
     */

    function randomize(bound) {
        return Math.random() * (bound || 1)
    }

    function load() {
        resize()
        init(update)
        // update()

        document.body.appendChild(canvas)
    }

    function addEvent(element, eventName, fn) {
        if (element.addEventListener) {
            element.addEventListener(eventName, fn, false)
        } else {
            element.attachEvent('on' + eventName, fn)
        }
    }

    addEvent(window, 'load', load)
    addEvent(window, 'resize', resize)
})(window, document)
