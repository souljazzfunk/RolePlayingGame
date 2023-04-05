import { rollDice, getDicePlaceholderHtml } from "./utils.js"

// Constructor named 'Character'
// eventally, convert the constructor function to a class.
export function Character(data){
    // copy all the object data to this
    Object.assign(this, data)
    this.currentHealth = this.health

    // init dice container, get dice placeholder
    this.initDiceContainer = () => {
        this.diceHtml = getDicePlaceholderHtml(this.diceCount)
    }
    this.initDiceContainer()

    // roll dice
    this.getDiceArray = () => {
        this.currentDiceScore = []
        for(let i=0; i<this.diceCount; i++){
            this.currentDiceScore.push(rollDice())
        }
        this.givingDamage = this.currentDiceScore.reduce((ttl, cur) => ttl + cur)
        return this.currentDiceScore
    }

    // get rolled dice html
    this.getDiceHtml = () => {
        this.diceHtml = this.getDiceArray().map((dice) => {
            return `<div class="dice">${dice}</div>`
        }).join('')
    }

    // handle damage
    this.getDamage = (damage) => {
        if(this.currentHealth > 0){
            this.currentHealth -= damage
            if(this.currentHealth <= 0){
                this.currentHealth = 0
                this.dead = true
            }
        }
    }

    // health bar html
    this.getHealthBarHtml = () => {
        const percentage = (this.currentHealth / this.health * 100).toFixed(0)
        return `
            <div class="health-bar-outer">
                <div class="health-bar-inner ${percentage < 25 ? 'danger' : ''}" 
                        style="width:${percentage}%;">
                </div>
            </div>
        `
    }

    // character html
    this.getCharacterHtml = () => {
        const {name, avatar, currentHealth, diceHtml} = this
        return `<div class="character-card">
                    <h4 class="name"> ${name} </h4>
                    <img class="avatar" src="${avatar}" />
                    <div class="health">health: <b>${currentHealth}</b></div>
                    ${this.getHealthBarHtml()}
                    <div class="dice-container">
                        ${diceHtml}
                    </div>
                </div>`

    }
}