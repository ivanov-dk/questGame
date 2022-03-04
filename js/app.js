const startScreen = $('#startScreen')
const introScreen = $('#introScreen')
const gameScreen = $('#gameScreen')

const startGameBtn = $('#startGame')
const buildHeroBtn = $('#buildHero')
let heroName = 'Dude'
let mainHero
let combatClass = 'Warrior'
let srcAvatar = 'img/class_warrior.jpg'
const selectClass = $('#selectCombatClass')

const avatarImg = $('.avatar_img')

let mainField = $('#main_field')
let heroFigure = $('#hero')

let posHeroX = 0,
    posHeroY = 0
let stepHero = 25

function $(obj) {
    return document.querySelector(obj)
}

function hide(obj) {
    obj.classList.add('d-none')
}

function show(obj) {
    obj.classList.remove('d-none')
}

// hide(startScreen)
// hide(introScreen)

$('#heroName').addEventListener('change', () => {
    return heroName = $('#heroName').value
})

startGameBtn.addEventListener('click', () => {
    startScreen.classList.add('animationLeft')
})

selectClass.addEventListener('change', () => {
    changeClassInput()

    return combatClass = selectClass.value
})

function changeClassInput() {
    switch (selectClass.value) {
        case 'Warrior':
            srcAvatar = avatarImg.src = 'img/class_warrior.jpg'
            break
        case 'Mage':
            srcAvatar = avatarImg.src = 'img/class_mage.jpg'
            break
        case 'Thief':
            srcAvatar = avatarImg.src = 'img/class_thief.jpg'
            break
    }
    return srcAvatar
}

// ** Create Hero **

function CreateHero(name, combatClass) {
    this.name = name
    this.class = combatClass
    this.level = 1
    this.exp = 0
    this.posX = 0
    this.posY = 0
}

buildHero.addEventListener('click', () => {
    mainHero = new CreateHero(heroName, combatClass)

    $('#stats_avatar').src = srcAvatar
    $('#statsHeroName').innerHTML = heroName
    $('#statsHeroClass').innerHTML = combatClass
    updateInfoExp()

    introScreen.classList.add('animationLeft')
    
    return mainHero
})

function updateInfoExp() {
    $('#statsHeroLevel').innerHTML = mainHero.level
    $('#statsExpHero').innerHTML = mainHero.exp
}

// ** / Create Hero **

$('#getExp').addEventListener('click', () => {
    mainHero.exp += 10
    updateInfoExp()
    checkLevelUp()
    expStatusBar()
})

// ** Experience & LevelUp **

let expTable = [0, 100]

for (let i = 1; i < 49; i++) {
    let newLevel = Math.round( expTable[expTable.length-1] * 1.2 )
    expTable.push(newLevel)
}

function checkLevelUp() {
    let curLevel = mainHero.level
    if (mainHero.exp >= expTable[curLevel]) {
        mainHero.level++
        mainHero.exp = mainHero.exp - expTable[curLevel]
    }
    return [ mainHero.exp, mainHero.level ]
}

// ** / Experience & LevelUp **

function expStatusBar() {
    let expPercent = mainHero.exp * 100 / expTable[mainHero.level]
    $('#expFill').style.width = expPercent + '%'
}

// ** Game Screen **

// function createGameField(w, h) {   

//     for (let i = 1; i <= h; i++) {
//         $('#main_field').insertAdjacentHTML('beforeend', `<div class="field_row"></div>`)
//     }
//     let arr = document.querySelectorAll('.game_row')
//     for (let obj of arr) {
//         for (let i = 1; i <= w; i++) {
//             obj.insertAdjacentHTML('beforeend', `<div></div>`)
//         }
//     }
// }

// createGameField(10, 10)

let fieldMap = new Map()

fieldMap.set(0, 'grass')
   .set(1, 'road')
   .set(2, 'mountain')
   .set(3, 'tree')
   .set(4, 'bush')

let gameField = [
    [0,0,1,0,0,0,0],
    [0,0,1,0,0,3,0],
    [0,0,1,1,1,0,0],
    [0,0,0,0,1,0,0],
    [0,0,3,0,1,0,0],
    [0,0,0,0,1,0,3],
    [0,0,0,0,1,0,0],
]



let obstructionArray = [2, 3, 4]

for (let i = 0; i < gameField.length; i++) {
    let row = document.createElement('div')
    row.classList.add('row')
    
    for (let j = 0; j < gameField[i].length; j++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')

        try {
            cell.classList.add(fieldMap.get(gameField[i][j]))
        } catch(e) {
            console.log(e)
        }

        row.appendChild(cell)
    }

    mainField.appendChild(row)
    
}

document.addEventListener('keydown', (event) => {
    let pressedKey = event.key

    if (pressedKey === 'ArrowUp') {
        movementHeroUp(pressedKey)
    }
    if (pressedKey === 'ArrowDown') {
        movementHeroDown(pressedKey)
    }
    if (pressedKey === 'ArrowLeft') {
        movementHeroLeft(pressedKey)
    }
    if (pressedKey === 'ArrowRight') {
        movementHeroRight(pressedKey)
    }

})


function movementHeroUp(pressedKey) {
    if (posHeroY > 0) {
        posHeroY -= stepHero
        heroFigure.style.top = posHeroY + 'px'
    }
}
function movementHeroDown(pressedKey) {
    if (posHeroY <= mainField.offsetHeight - 25) {
        posHeroY += stepHero
        heroFigure.style.top = posHeroY + 'px'
    }
}
function movementHeroLeft(pressedKey) {
    if (posHeroX > 0) {
        posHeroX -= stepHero
        heroFigure.style.left = posHeroX + 'px'
    }
}
function movementHeroRight(pressedKey) {
    // let heroPosPointX = Math.ceil(posHeroX / 25)
    // let heroPosPointY = Math.ceil(posHeroY / 25)

    // let good = true

    // for (let el of obstructionArray) {
    //     // console.log(el)
    //     console.log( gameField[heroPosPointX + 1][heroPosPointY] )
    //     if ( gameField[heroPosPointX + 1][heroPosPointY] === el) {
    //         good = false
    //     }
    // }

    if (posHeroX <= mainField.offsetWidth - 25 - stepHero) {
        posHeroX += stepHero
        heroFigure.style.left = posHeroX + 'px'
    }
}