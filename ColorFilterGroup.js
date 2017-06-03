const w = window.innerWidth,h = window.innerHeight
class ColorFilterGroup extends HTMLElement{
    constructor() {
        super()
        this.img = document.createElement('img')
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.img)
        this.colors = this.getAttribute('colors').split(",")
        this.colors = this.colors.map((color)=>new ColorFilter(color))
        this.index = this.colors.length - 1
        this.arrows = [new Arrow(1),new Arrow(-1)]
    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const context = canvas.getContext('2d')
        this.colors.forEach((color)=>{
            color.draw(context)
        })
        this.arrows.forEach((arrow)=>{
            arrow.draw(context)
        })
        this.img.src = canvas.toDataURL()
    }
    connectedCallback() {
        this.render()
        this.img.onmousedown = (event) => {
            var colorFilter = null
            const x = event.offsetX ,y = event.offsetY
            this.arrows.forEach((arrow)=>{
                if(arrow.handleTap(x,y,this.index,this.colors.length) == true) {
                    colorFilter = this.colors[this.index]
                    colorFilter.startUpdating(arrow.getDir())
                    return
                }
            })
            if(colorFilter != null) {
                const interval = setInterval(() => {
                    colorFilter.update()
                    if(colorFilter.stopped() == true) {
                        this.index += colorFilter.getPrevDir()
                        this.render()
                        clearInterval(interval)
                        if(this.index >= this.colors.length) {
                            this.index = this.colors.length -1
                        }
                        if(this.index <0) {
                            this.index = 0
                        }
                    }
                    this.render()
                },50)

            }
        }
    }
}
class Arrow {
    constructor(dir) {
        this.x = w*0.9
        this.y = h*0.8
        this.dir = dir
    }
    draw(context) {
        context.strokeStyle = 'white'
        context.lineWidth = w/200
        context.save()
        context.translate(this.x,this.y)
        context.beginPath()
        context.moveTo(0,this.dir*h*0.01)
        context.lineTo(0,this.dir*h*0.1)
        context.stroke()
        context.beginPath()
        context.moveTo(h*0.03,this.dir*h*0.07)
        context.lineTo(0,this.dir*h*0.1)
        context.lineTo(-h*0.03,this.dir*h*0.07)
        context.stroke()
        context.restore()
    }

    handleTap(x,y,index,size) {
        return x>=this.x - h*0.1 && x<=this.x+h*0.1 && ((index != length-1 && this.dir == 1 && y>= this.y && y<=this.y+0.1*h) || (index != 0 && this.dir == -1 && y <= this.y && y>=this.y-0.1*h))
    }
    getDir() {
        return this.dir
    }
}
class ColorFilter  {
    constructor(color) {
        this.scale = 1
        this.color = color
        this.dir = 0
        this.prevDir = 0
    }
    draw(context) {
        context.fillStyle = this.color
        context.fillRect(0,0,w,h*this.scale)
    }
    startUpdating(dir) {
        this.dir = dir
    }
    getPrevDir() {
      return this.prevDir
    }
    update() {
        console.log(`the direction is ${this.dir}`)
        this.scale += 0.1*this.dir
        if(this.scale < 0) {
            this.resetDir()
            this.scale = 0
        }
        if(this.scale > 1) {
            this.resetDir()
            this.scale = 1
        }
    }
    resetDir() {
        this.prevDir = this.dir
        this.dir = 0
    }
    stopped() {

        return this.dir == 0
    }
}
customElements.define('color-filter-group',ColorFilterGroup)
