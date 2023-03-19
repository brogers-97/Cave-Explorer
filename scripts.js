const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
//canvas.setAttribute('height', getComputedStyle(canvas).height)
//canvas.setAttribute('width', getComputedStyle(canvas).width)


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

    gravity(){
        this.y += 4
    }
}

class Cave{
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

    update(){
        this.x -= this.width
    }
}

const firstCave = new Cave(290, 0, 50, 10, 'green')
let caveArray = [firstCave]

const num = [50, 45, 40, 35, 30, 25, 20, 25, 30, 35, 40]
let i = 0
direction = 1

function keyPress(e) {
    if(e.key === " "){
        console.log('jump')
        mainChar.y -= 15
        if(i >= num.arr){
            i = num.arr - 1
            direction = -1
        } else if(i < 0){
            i = 0
            direction = 1
        }
        i += direction
    }
}

document.addEventListener('keydown', keyPress)
const mainChar = new Character(50, 50, 15, 15, 'orange')
mainChar.render()



function gameController(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mainChar.render()
    mainChar.gravity()

    caveArray.push(new Cave(290, 0, num[i], 10, 'green'))
    for(let j = 0; j < caveArray.length; j++){
        caveArray[j].render()
        caveArray[j].update()
        console.log(i)
    }
} 

const jumpLoop = setInterval(gameController, 100)


