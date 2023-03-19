const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
const startBtn = document.querySelector("#startBtn")
const resetBtn = document.querySelector("#restartBtn")
//canvas.setAttribute('height', getComputedStyle(canvas).height)
//canvas.setAttribute('width', getComputedStyle(canvas).width)
resetBtn.style.visibility = 'hidden'

// constructs the orange square used for the game (mainChar)
class Character{
    constructor(x, y, height, width, color) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.color = color
    }
    // function that will create the character when invoked (see line 94)
    render(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    // function that imitates gravity by increasing the y axis distance when invoked (see line 95)
    gravity(){
        this.y += 4
    }
}

// constructs the cave ceiling and floors
class Cave{
    constructor(x, y, height, width, color) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.color = color
    }
    // function that will create a column that is used as the cave ceiling/floor when invoked
    render(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    // function that moves the column from the right of the screen to the left upon invocation
    update(){
        this.x -= this.width
    }
}

// lines 48 & 49 are arrays to store the created columns (see line 100 and 119)
let ceilingArray = []
let floorArray = []
// these arrays control the heights of the columns when the index (on line 53) is changed.
const floorHeight = [135, 130, 125, 120, 115, 110, 105, 110, 115, 120, 125]
const ceilingHeight = [50, 45, 40, 35, 30, 25, 20, 25, 30, 35, 40]
let i = 0
direction = 1
// the below function creates an effect where "i" will bounce from 0 to the end of the arrays on line 51 & 52 and then iterate back through the arrays backwards. it will do this everysingle time the 'keydown' is invoked on line 70
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
document.addEventListener('keydown', keyPress)


// stops running the gameController when invoked (see lines 110 & 126)
function hitCave(){
    clearInterval(jumpLoop)
    resetBtn.style.visibility = 'visible'
}


// lines 80 -> 83 control the booleans that will determine if the gameController runs or not (whether the game starts or not)
let gameStarted = false
startBtn.addEventListener('click', function(){
    gameStarted = true
    startBtn.style.visibility = 'hidden'
})

const mainChar = new Character(50, 50, 15, 15, 'orange')

//controls the flow of the game. The collision detection. Creates the cave walls. The mainChars fall rate.
function gameController(){
    if(!gameStarted){
        return
    }

    // refreshes the canvas with the current locations of the mainChar and each cave Ceiling/Floor.
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    mainChar.render()
    mainChar.gravity()

    // every tenth of a second the code on line 98 will push a new column representing the cave floor into the array
    floorArray.push(new Cave(290, floorHeight[i], 200, 10, 'green'))
    // every column inside of the array is being rendered and updated every tenth of a second.
    for(let j = 0; j < floorArray.length; j++){
        floorArray[j].render()
        floorArray[j].update()
        // each column is being checked for these conditions to show a collision. 
        if(mainChar.x < floorArray[j].x + floorArray[j].width &&
            mainChar.x + mainChar.width > floorArray[j].x &&
            mainChar.y + mainChar.height > floorArray[j].y &&
            mainChar.y < floorArray[j].y + floorArray[j].height) {
             hitCave()
            }
        // to keep the game from crashing, this clears away the columns that are no longer present on the canvas.
        if(floorArray[j].x + floorArray[j].width < 0){
            floorArray.splice(j, 1)
            j--
        }
    }
    // lines 117 -> 130 repeat the logic of the code from line 98 -> 115
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

//runs the gameController every tenth of a second. stored in a variable so it can be clear upon collision
const jumpLoop = setInterval(gameController, 100)

function resetGame(){
    clearInterval(jumpLoop)
    gameStarted = false
}
resetBtn.addEventListener('click', resetGame())
