console.log('linked')
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')

console.log(ctx)

canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// canvas.addEventListener('click', e => {
//     console.log(`x: ${e.offsetX}, y: ${e.offsetY}`)
// })

class Character{
    constructor(x, y, height, width, color) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.color = color
    }

    render(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.height, this.width)
    }

}


const mainChar = new Character(50, 50, 15, 15, 'orange')
mainChar.render()

document.addEventListener('keydown',jump)

function jump(e) {
    console.log('clicked')
    const gravity = 10
    switch(e.key) {
        case "ArrowUp":
            mainChar.y -= gravity
            break
    }
}

