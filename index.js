import characterData from "./data.js"
import { Character } from "./Character.js"

// init
const monsters = Object.keys(characterData).filter(name => name !== 'hero')

// get new monster
const getNewMonster = () => {
    const monster =  new Character(characterData[monsters[0]])
    monsters.shift()
    return monster
}

let monster = getNewMonster()
const hero =  new Character(characterData.hero)

// attack
let isWaiting = false
const attack = () => {
    if(!isWaiting){
        hero.getDiceHtml()
        monster.getDiceHtml()
        hero.getDamage(monster.givingDamage)
        monster.getDamage(hero.givingDamage)
        render()

        if(hero.dead || monster.dead){
            isWaiting = true
            if(monsters.length === 0){
                setTimeout(() => {
                    endGame()
                }, 1500);
            }
            else {
                monster = getNewMonster()
                hero.initDiceContainer()
                setTimeout(() => {
                    render()
                    isWaiting = false
                }, 1500);
            }
        }
    }
}
document.getElementById('attack-button').addEventListener('click', attack)

// end game
const endGame = () => {
    const emoji = hero.dead ? '☠️' : '🔮'
    let endingSubTitle = ''
    let endingMessage = ''
    if(hero.dead && monster.dead){
        endingSubTitle = 'Deadlock Draw'
        endingMessage = 'Alas, in the end, the battle was too much for all involved, and all perished in a final, explosive clash of magic and might. None emerged victorious in this battle, and it will be remembered as a tragic draw in which all were vanquished.'
    }
    else if(monster.dead){
        endingSubTitle = 'Magical Triumph'
        endingMessage = `The ${hero.name}'s mastery of the arcane arts proved too much for the ${monster.name}, securing a well-deserved victory in this battle.`
    }
    else if(hero.dead){
        endingSubTitle = 'Savage Conquest'
        endingMessage = `The dark powers of the ${monster.name} proved too much for the ${hero.name} to handle, securing its victory in this fierce battle.`
    }
    document.body.innerHTML = `
        <h1 class="end-game">GAME OVER</h1>
        <div class="end-emoji">${emoji}</div>
        <h2>${endingSubTitle}</h2>
        <h3 class="end-msg">${endingMessage}</h3>
    `
}

// render
function render() {
    document.getElementById('hero').innerHTML = hero.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

render()