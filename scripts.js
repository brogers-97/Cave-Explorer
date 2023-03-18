const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)


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
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}


const ceiling = new Character(200, 0, 80, 10, 'green')
ceiling.render()

// function funFunction(){
//     if(i >= easyCeiling.length){
//         i = easyCeiling.length - 1
//         direction = -1
//     } else if(i < 0){
//         i = 0
//         direction = 1
//     }
//     //console.log(i)
//     i += direction 
// }

// x max width = 410
const mainChar = new Character(50, 50, 15, 15, 'orange')
mainChar.render()

function keyPress(e) {
    if(e.key === " "){
        console.log('jump')
        mainChar.y -= 10
    }
}
document.addEventListener('keydown', keyPress)

function gameController(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mainChar.y += 2
    mainChar.render()
}

//const jumpLoop = setInterval(gameController, 100)


