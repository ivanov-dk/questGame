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