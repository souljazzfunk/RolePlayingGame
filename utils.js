export const rollDice = () => {
        return Math.floor(Math.random() * 6) + 1
}
    
// dice placeholder html
export const getDicePlaceholderHtml = (diceCount) => {
        let html = ''
        for(let i=0; i < diceCount; i++){
                html += `<div class="placeholder-dice"></div>`
        }
        return html
}
