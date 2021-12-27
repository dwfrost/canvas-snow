function randomize(bound = 1) {
    return Math.random() * bound
}
class Snow {
    /**
     * 配置参数
     * @param {Object} options
     * @param {Number} options.width canvas宽
     * @param {Number} options.height canvas高
     * @param {Number} options.scale 雪花图片缩放倍数
     * @param {Number} options.speed 雪花图片飘落速度
     * @param {Number} options.opacity 雪花图片透明度
     */
    constructor(options) {
        this.options = options || {}

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.count = 0
        this.snowItems = []

        let style = this.canvas.style
        // style.position = 'fixed'
        // style.top = '0'
        // style.left = '0'
        style.width = this.options.width || '100%'
        style.height = this.options.height || '100%'
        // style.zIndex = '999999'
        // style.pointerEvents = 'none'

        window.addEventListener('load', this.onLoad.bind(this))
        window.addEventListener('resize', this.resize.bind(this))
    }

    onLoad(callback) {
        // callback && callback()
        this.resize()
        this.init(this.update.bind(this))
        document.body.appendChild(this.canvas)
        // this.start()
    }

    start() {
        this.resize()
        this.init(this.update.bind(this))
        document.body.appendChild(this.canvas)
    }

    resize() {
        let element = document.documentElement,
            body = document.body

        const width = this.options.width || window.innerWidth || element.clientWidth || body.clientWidth
        const height = this.options.height || window.innerHeight || element.clientHeight || body.clientHeight
        this.count = ((width * height) / 7500) >> 0

        this.canvas.width = width
        this.canvas.height = height
        this.ctx.fillStyle = '#FFF'
    }

    init(callback) {
        this.snowItems = new Array(this.count)

        let img = new Image()
        this.__img = img
        img.src = this.options.snowImg || 'https://cdn.jsdelivr.net/gh/dwfrost/images@master/20211227/snow.229eudr2rxts.webp'
        img.onload = () => {
            for (let i = 0; i < this.count; i++) {
                this.snowItems[i] = new SnowItem({ ...this.options, canvasWidth: this.canvas.width, canvasHeight: this.canvas.height })
            }
            callback(img)
        }
    }

    update(img) {
        window.requestAnimationFrame(() => {
            this.update(img)
        })

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (let i = 0; i < this.count; i++) {
            const snowflake = this.snowItems[i]
            snowflake.y += snowflake.vy
            snowflake.x += snowflake.vx

            if (snowflake.y > this.canvas.height || snowflake.x > this.canvas.width || snowflake.x < 0) {
                this.snowItems[i] = new SnowItem({ ...this.options, canvasWidth: this.canvas.width, canvasHeight: this.canvas.height })
            } else if (snowflake.y > 0) {
                this.ctx.globalAlpha = snowflake.opacity
                this.ctx.beginPath()
                this.ctx.drawImage(img, snowflake.x, snowflake.y, img.width * snowflake.scale, img.height * snowflake.scale)
                this.ctx.closePath()
                this.ctx.fill()
            }
        }
    }
}

class SnowItem {
    constructor(options = {}) {
        let defaultOptions = { scale: 0.2, speed: 1, opacity: 0, canvasWidth: 0, canvasHeight: 0 }
        options = { ...defaultOptions, ...options }
        this.x = randomize(options.canvasWidth)
        this.y = randomize(options.canvasHeight * -1)
        this.scale = options.scale
        // this.scale = 0.2
        this.opacity = options.opacity || 0.3 + randomize(0.7) // 透明度
        this.vy = 1 * options.speed + randomize(3) // y轴速度
        this.vx = 0.5 * options.speed - randomize() // x轴速度
    }
}

const snow = new Snow({
    // width: '200',
    // height: '200',
    scale: 0.2,
    speed: 1,
    opacity: 1,
    snowImg: 'https://cdn.jsdelivr.net/gh/dwfrost/images@master/20211227/snow.229eudr2rxts.webp'
})
// snow.onReady(() => {
//     snow.start()
// })

// export default Snow
// module.exports = {
//     Snow
// }
