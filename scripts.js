const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
const startBtn = document.querySelector("#startBtn")
const resetBtn = document.querySelector("#restartBtn")
const instructions = document.querySelector("#instructions")
const exploreTitle = document.querySelector("#explore")
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)
const gameScore = document.querySelector("#score")
let died = false
let score = 0
canvas.width = 500;
canvas.height = 200;
resetBtn.style.visibility = 'hidden'



const caveAudio = new Audio()
caveAudio.src = document.querySelector("#caveSounds").src
caveAudio.loop = true




class Character{
    constructor(x, y, height, width, color, glowColor) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.color = color
        this.glowColor = glowColor
    }
    
    render(){
        ctx.shadowBlur = 20
        ctx.shadowColor = this.glowColor
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.shadowBlur = 0
        ctx.shadowColor= 'transparent'
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




//TITLE ANIMATION

let startAnimation = false
let x = 0
function exploringAnimation(){
    titleArray = ['Exploring.', 'Exploring..', 'Exploring...', 'Exploring....']
    if(startAnimation){
    if(x === titleArray.length - 1){
        x = 0
    }
    exploreTitle.innerHTML = titleArray[x]
    x++
}
}






//CAVE GENERATION

let ceilingArray = []
let floorArray = []
let floorHeight = [135, 130, 125, 120, 115, 110, 105, 110, 115, 120, 125]
let ceilingHeight = [50, 45, 40, 35, 30, 25, 20, 25, 30, 35, 40]
let i = 0
direction = 1
function keyPress(e) {
    if(e.key === " "){
        e.preventDefault();
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






//HIT CAVE COLLISSION

function hitCave(){
    gameStarted = false
    countScore = false
    died = true
    startAnimation = false
    exploreTitle.innerHTML = 'You died exploring'
    resetBtn.style.visibility = 'visible'
    instructions.innerHTML = ':('
    instructions.style.visibility = 'visible'
    caveAudio.pause()
}




//START BUTTON

let countScore = false
let gameStarted = false
startBtn.addEventListener('click', function(){
    gameStarted = true
    countScore = true
    died = false
    startAnimation = true
    startBtn.style.visibility = 'hidden'
    instructions.style.visibility = 'hidden'
    caveAudio.play()
})




//RESET BUTTON

resetBtn.addEventListener('click', function(){
    gameStarted = false
    floorHeight = [135, 130, 125, 120, 115, 110, 105, 110, 115, 120, 125]
    ceilingHeight = [50, 45, 40, 35, 30, 25, 20, 25, 30, 35, 40]
    floorArray = []
    ceilingArray = []
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    exploreTitle.innerHTML = 'Cave Explorer'
    startBtn.style.visibility = 'visible'
    resetBtn.style.visibility = 'hidden'
    instructions.innerHTML = 'Keep your dot floating by hitting the SPACEBAR. The farther in you go the smaller the cave becomes, making it harder to predict and adjust to the steep falls and climbs of the cave walls.'
    instructions.style.visibility = 'visible'
    score = 0
    gameScore.innerHTML = `Score: ${score}`
})



//KEEPS THE SCORE

function increaseScore(){
    if(countScore){
        score += 1
        gameScore.innerHTML = `Score: ${score}`
    }
}





//CHANGES CAVE SIZE

function increaseDifficulty(){
    if(died){
        return
    }
    for(let i = 0; i < floorHeight.length; i++){
        floorHeight[i] -= 5
    }
    console.log('difficulty has increased!')
}





const mainChar = new Character(50, 50, 15, 15, 'green', '#39FF14')


function gameController(){
    if(!gameStarted){
        return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mainChar.gravity()
    mainChar.render()
    floorArray.push(new Cave(canvas.width, floorHeight[i], 200, 10, 'purple'))
    for(let j = 0; j < floorArray.length; j++){
        floorArray[j].render()
        floorArray[j].update()
        if(mainChar.x <= floorArray[j].x + floorArray[j].width &&
            mainChar.x + mainChar.width >= floorArray[j].x &&
            mainChar.y + mainChar.height >= floorArray[j].y) {
             hitCave()
            }
        if(floorArray[j].x + floorArray[j].width < 0){
            floorArray.splice(j, 1)
            j--
        }
    }
    ceilingArray.push(new Cave(canvas.width, 0, ceilingHeight[i], 10, 'purple'))
    for(let j = 0; j < ceilingArray.length; j++){
        ceilingArray[j].render()
        ceilingArray[j].update()
        if(mainChar.x <= ceilingArray[j].x + ceilingArray[j].width &&
            mainChar.x + mainChar.width >= ceilingArray[j].x &&
            mainChar.y <= ceilingArray[j].y + ceilingArray[j].height) {
             hitCave()
            }
        if(ceilingArray[j].x + ceilingArray[j].width < 0){
            ceilingArray.splice(j, 1)
            j--
        }
    }
} 


const gameLoop = setInterval(gameController, 100)
const keepScore = setInterval(increaseScore, 300)
const changeDifficulty = setInterval(increaseDifficulty, 30000)
const titleAnimation = setInterval(exploringAnimation, 1000)