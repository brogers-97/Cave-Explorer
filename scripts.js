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

let firstCeiling = new Character(403, 0, 20, 15, 'green')
let secondCeiling = new Character(403, 0, 30, 15, 'green')
let thirdCeiling = new Character(403, 0, 40, 15, 'green')
let fourthCeiling = new Character(403, 0, 50, 15, 'green')
let fifthCeiling = new Character(403, 0, 60, 15, 'green')
let firstFloor = new Character(403, 160, 100, 15, 'green')
let secondFloor = new Character(403, 170, 100, 15, 'green')
let thirdFloor  = new Character(403, 180, 100, 15, 'green')
let fourthFloor = new Character(403, 190, 100, 15, 'green')
let fifthFloor = new Character(403, 200, 100, 15, 'green')
const easy = [firstCeiling, firstFloor, secondCeiling, secondFloor, thirdCeiling, thirdFloor, fourthCeiling, fourthFloor, fifthCeiling, fifthFloor]


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

function generateCave() {
    let count = 0
    let atZero = true
    if(atZero){
        easy[count].render()
        easy[count + 1].render()
        count += 2
    }
}


const caveGeneration = setInterval(generateCave, 2000)

function gameController(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mainChar.y += 2
    mainChar.render()
    function keyPress(e) {
        if(e.key === " "){
            console.log('jump')
            mainChar.y -= 10
        }
    }
}

//const jumpLoop = setInterval(gameController, 100)


