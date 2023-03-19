const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
const startBtn = document.querySelector("#startBtn")
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


let ceilingArray = []
let floorArray = []
const floorHeight = [135, 130, 125, 120, 115, 110, 105, 110, 115, 120, 125]
const ceilingHeight = [50, 45, 40, 35, 30, 25, 20, 25, 30, 35, 40]
let i = 0
direction = 1

function keyPress(e) {
    if(e.key === " "){
        console.log('jump')
        mainChar.y -= 15
        if(i >= ceilingHeight.length - 1){
            i = ceilingHeight.length - 1
            direction = -1
        } else if(i === 0 && direction === -1){
            i = 0
            direction = 1
        }
        i += direction
    }
}

function hitCave(){
    clearInterval(jumpLoop)
}

document.addEventListener('keydown', keyPress)
const mainChar = new Character(50, 50, 15, 15, 'orange')

let gameStarted = false
startBtn.addEventListener('click', function(){
    gameStarted = true
})

function gameController(){
    if(!gameStarted){
        return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mainChar.render()
    mainChar.gravity()
    floorArray.push(new Cave(290, floorHeight[i], 200, 10, 'green'))
    for(let j = 0; j < floorArray.length; j++){
        floorArray[j].render()
        floorArray[j].update()
        if(mainChar.x < floorArray[j].x + floorArray[j].width &&
            mainChar.x + mainChar.width > floorArray[j].x &&
            mainChar.y + mainChar.height > floorArray[j].y &&
            mainChar.y < floorArray[j].y + floorArray[j].height) {
             hitCave()
            }
        if(floorArray[j].x + floorArray[j].width < 0){
            floorArray.splice(j, 1)
            j--
        }
    }
    ceilingArray.push(new Cave(290, 0, ceilingHeight[i], 10, 'green'))
    for(let j = 0; j < ceilingArray.length; j++){
        ceilingArray[j].render()
        ceilingArray[j].update()
        if(mainChar.x < ceilingArray[j].x + ceilingArray[j].width &&
            mainChar.x + mainChar.width > ceilingArray[j].x &&
            mainChar.y < ceilingArray[j].y + ceilingArray[j].height) {
             hitCave()
            }
        if(ceilingArray[j].x + ceilingArray[j].width < 0){
            ceilingArray.splice(j, 1)
            j--
        }
    }
} 

const jumpLoop = setInterval(gameController, 100)


