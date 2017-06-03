const w = window.innerWidth,h = window.innerHeight
class ColorFilterGroup extends HTMLElement{
    constructor() {
        super()
        this.img = document.createElement('img')
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.img)
        this.colors = this.getAttributes('colors').split(",")
    }
    render() {

    }
    connectedCallback() {
        this.render()
    }
}
class Arrow {
    constructor(dir) {
        this.x = w*0.9
        this.y = h*0.8
        this.dir = dir
    }
    draw(context) {
        context.lineWidth = w/30
        context.save()
        context.translate(this.x,this.y)
        context.beginPath()
        context.moveTo(0,0)
        context.lineTo(0,this.dir*h*0.1)
        context.stroke()
        context.restore()
    }
    handleTap(x,y) {
        return x>=this.x - w/30 && x<=this.x+w/30 && ((this.dir == 1 && y>= this.y && y<=this.y+0.1*h) || (this.dir == -1 && y <= this.y && y>=this.y-0.1*h))
    }
}
class ColorFilter  {
    constructor(color) {
        this.scale = 0
        this.color = color
    }
    draw(context) {
        context.fillStyle = this.color
        context.fillRect(0,0,w,h*this.scale)
    }
}
