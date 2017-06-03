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
        this.x = window.innerWidth - window.innerWidth /10
        this.y = window.innerHeight*0.8
        this.dir = dir
    }
    draw() {

    }
    handleTap(x,y) {

    }
}
