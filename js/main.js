class Game {
    constructor() {
        this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs']
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
        this.playersHand = []
        this.dealersHand = []
        this.deck = []
        this.startButton = document.getElementById('start-button')
        this.hitButton = document.getElementById('button-hit')
        this.hitButton.disabled = true
        this.standButton = document.getElementById('button-stand')
        this.standButton.disabled = true
        this.playerScore = document.getElementById('players-score')
        this.dealerScore = document.getElementById('dealers-score')
        this.playersCardsInPlay = document.getElementById('players-hand')
        this.dealersCardsInPlay = document.getElementById('dealers-hand')
        this.gameStatus = document.getElementById('game-status')
        this.resetButton = document.getElementById('reset-button')
        this.addEvents()
    }

    addEvents() {
        this.startButton.addEventListener('click', () => this.startGame())
        this.hitButton.addEventListener('click', () => this.handleHit())
        this.standButton.addEventListener('click', () => this.handleStand())
        this.resetButton.addEventListener('click', () => this.reset())
    }

    startGame() {
        this.deck = this.generateDeck()
        this.playersHand = [this.getCard(), this.getCard()]
        this.dealersHand = [this.getCard(), this.getCard()]
        this.hitButton.disabled = false
        this.standButton.disabled = false
        this.startButton.disabled = true
        this.render()
    }

    handleHit() {
        this.playersHand.push(this.getCard())
        this.dealersHand.push(this.getCard()) 
        this.render()
        this.checkForWinner()
    }

    handleStand() {
        this.dealersHand.push(this.getCard())
        this.hitButton.style.display = 'none';
        this.render()
        this.checkForWinner()
    }

    generateDeck() {
        let deckArray = [];
        for (let s = 0; s < this.suits.length; s++) {
            for (let v = 0; v < this.values.length; v++) {
                let newCard = {
                    suit: this.suits[s],
                    value: this.values[v],
                };
                deckArray.push(newCard);
            }
        }
        return deckArray;
    }

    getCard() {
        let randomIndex = Math.floor(Math.random() * this.deck.length)
        let card = this.deck[randomIndex]
        this.deck.splice(randomIndex, 1)
        return card
    }

    calculateScore(userHand) {
        let sum = 0
        let aceCount = 0
        for (let i = 0; i < userHand.length; i++) {
            let value = userHand[i].value
            if (value === 'J' || value === 'Q' || value === 'K') {
                sum += 10;
            } else if (value === 'A') {
                sum += 11
                aceCount++
            } else {
                sum += value
            }
        }   

        while (sum > 21 && aceCount > 0) {
            sum -= 10
            aceCount -= 1
        }
        return sum
    }

    checkForWinner() {
        let playerScore = this.calculateScore(this.playersHand)
        let dealerScore = this.calculateScore(this.dealersHand)

        if (playerScore > 21) {
            this.gameStatus.innerHTML = `<p>"Game Over. You busted. Dealer wins."</p>`
            this.hitButton.disabled = true
            this.standButton.disabled = true
            this.startButton.disabled = false

        } else if (dealerScore > 21) {
            this.gameStatus.innerHTML = `<p>"Game Over. Dealer busted. YOU WIN!"</p>`
            this.hitButton.disabled = true
            this.standButton.disabled = true
            this.startButton.disabled = false

        } else if (playerScore === 21) {
            this.gameStatus.innerHTML = `<p>"Blackjack. YOU WIN!"</p>`
            this.hitButton.disabled = true
            this.standButton.disabled = true
            this.startButton.disabled = false
            
        } else if (dealerScore === 21) {
            this.gameStatus.innerHTML = `<p>"Blackjack. Dealer wins!"</p>`
            this.hitButton.disabled = true
            this.standButton.disabled = true
            this.startButton.disabled = false
        }
    }   

    displayCards() {
        this.playersCardsInPlay.innerHTML = ''
        for (let i = 0; i < this.playersHand.length; i++) {
            this.playersCardsInPlay.innerHTML += JSON.stringify(this.playersHand[i]).replace(/{"suit":"/g,'').replace(/","/g,' ').replace(/value":/g,'').replace(/}/g,'').replace(/"/g,'') + "</br>"
        }

        this.dealersCardsInPlay.innerHTML = ''
        for (let i = 0; i < this.dealersHand.length; i++) {
            this.dealersCardsInPlay.innerHTML += JSON.stringify(this.dealersHand[i]).replace(/{"suit":"/g,'').replace(/","/g,' ').replace(/value":/g,'').replace(/}/g,'').replace(/"/g,'') + "</br>"
        }
    }

    render() {
        this.playerScore.innerHTML = `<p>Player's Score: ${this.calculateScore(this.playersHand)}</p>`
        this.dealerScore.innerHTML = `<p>Dealer's Score: ${this.calculateScore(this.dealersHand)}</p>`
        this.hitButton.style.display = ''
        this.displayCards();
    }

    reset() {
        this.startGame()
        this.gameStatus.innerHTML = '<p></p>'
        this.startGame()
    }
}

const game = new Game()






