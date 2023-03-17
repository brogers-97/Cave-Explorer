console.log('linked')
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

// x max width = 410
// const caveFloor = new Character(410, 150, 100, 7, 'green')
// caveFloor.render()
// const caveCeiling = new Character(410, 0, 60, 7, 'green')
// caveCeiling.render()
const mainChar = new Character(50, 56, 15, 15, 'orange')
mainChar.render()

function generateCave(){
    let ceiling = new Character(410, 0, 60, 7, 'green')
    ceiling.render()
    ceiling.x -= 7
    let floor = new Character(410, 150, 100, 7, 'green')
    floor.render()
    floor.x -= 7
}

function detectCollisionFloor(){
    const top = mainChar.y + mainChar.height >= caveFloor.y
    const left = mainChar.x + mainChar.width >= caveFloor.x
    const right = mainChar.x + mainChar.width <= caveFloor.x + caveFloor.width
    if(top && left && right){
        console.log('collision')
    }
}

function detectCollisionCeiling(){
    const top = mainChar.y <= caveCeiling.y + caveCeiling.height
    const left = mainChar.x + mainChar.width >= caveCeiling.x
    const right = mainChar.x + mainChar.width <= caveCeiling.x + caveCeiling.width
    if(left && top && right){
        console.log(`left is ${left}`)
        console.log(`top is ${top}`)
        console.log('collision')
    }
}


function keyPress(e) {
    if(e.key === " "){
        console.log('jump')
        mainChar.y -= 10
    }
}

function gravity(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mainChar.y += 2
    mainChar.render()
    generateCave()
    
}

//const jumpLoop = setInterval(gravity, 100)

document.addEventListener('keydown', keyPress)
