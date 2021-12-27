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
     * @param {Boolean} options.autoplay 自动播放
     */
    constructor(options) {
        this.options = options || {}

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.count = 0
        this.snowItems = []
        this.timer = null
        this.img = null

        let style = this.canvas.style
        // style.position = 'fixed'
        // style.top = '0'
        // style.left = '0'
        style.width = this.options.width || '100%'
        style.height = this.options.height || '100%'
        style.pointerEvents = 'none'
        // style.zIndex = '999999'

        window.addEventListener('load', this.onLoad.bind(this))
        window.addEventListener('resize', this.resize.bind(this))
        document.body.appendChild(this.canvas)
    }

    onLoad() {
        this.resize()
        this.options.autoplay && this.start()
    }

    async start() {
        await this.loadSnowImg()
        this.update()
    }
    stop() {
        cancelAnimationFrame(this.timer)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.snowItems = []
    }

    pause() {
        cancelAnimationFrame(this.timer)
    }
    continue() {
        this.update()
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

    // 加载雪花图片
    loadSnowImg() {
        this.snowItems = new Array(this.count)

        let img = new Image()
        img.src = this.options.snowImg || 'https://cdn.jsdelivr.net/gh/dwfrost/images@master/20211227/snow.229eudr2rxts.webp'
        this.img = img

        return new Promise(resove => {
            img.onload = () => {
                for (let i = 0; i < this.count; i++) {
                    this.snowItems[i] = new SnowItem({ ...this.options, canvasWidth: this.canvas.width, canvasHeight: this.canvas.height })
                }
                resove()
            }
        })
    }

    update() {
        this.timer = window.requestAnimationFrame(() => {
            this.update()
        })

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        const img = this.img

        for (let i = 0; i < this.count; i++) {
            const snowItem = this.snowItems[i]
            snowItem.y += snowItem.vy
            snowItem.x += snowItem.vx

            if (snowItem.y > this.canvas.height || snowItem.x > this.canvas.width || snowItem.x < 0) {
                this.snowItems[i] = new SnowItem({ ...this.options, canvasWidth: this.canvas.width, canvasHeight: this.canvas.height })
            } else if (snowItem.y > 0) {
                this.ctx.globalAlpha = snowItem.opacity
                this.ctx.beginPath()
                this.ctx.drawImage(img, snowItem.x, snowItem.y, img.width * snowItem.scale, img.height * snowItem.scale)
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
        this.opacity = options.opacity || 0.3 + randomize(0.7) // 透明度
        this.vy = 1 * options.speed + randomize(3) // y轴速度
        this.vx = 0.5 * options.speed - randomize() // x轴速度
    }
}
