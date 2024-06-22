function setPromptInvisible (isInvisible: boolean) {
    for (let value of promptSprites) {
        value.setFlag(SpriteFlag.Invisible, isInvisible)
    }
    playerCardSprite.setFlag(SpriteFlag.Invisible, !(isInvisible))
}
function initTable () {
    info.setScore(0)
    scene.setBackgroundColor(6)
    headerSprite = fancyText.create("Acey Deucey")
    fancyText.setFont(headerSprite, fancyText.art_deco_11)
    fancyText.setColor(headerSprite, 9)
    headerSprite.setPosition(80, 10)
    prompts = [
    "Will the next card",
    "fall in between?",
    "Aces are high.",
    "A = Yes  B = No"
    ]
    y = 35
    promptSprites = []
    for (let value of prompts) {
        promptSprite = fancyText.create(value)
        fancyText.setColor(promptSprite, 15)
        fancyText.setFont(promptSprite, fancyText.bold_sans_7)
        promptSprite.x = 80
        promptSprite.y = y
        promptSprites.push(promptSprite)
        y += 10
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (waitingForPlayer) {
        playerChoseBetween = false
        reveal()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (waitingForPlayer) {
        playerChoseBetween = true
        reveal()
    }
})
function reveal () {
    setPromptInvisible(true)
    isBetween = rightCard.isLessThan(playerCard) && playerCard.isLessThan(leftCard) || leftCard.isLessThan(playerCard) && playerCard.isLessThan(rightCard)
    if (playerChoseBetween == isBetween) {
        info.changeScoreBy(1)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        pause(1000)
        startRound()
    } else {
        pause(1000)
        game.gameOver(false)
    }
}
function drawCards () {
    if (theDeck.numCardsRemain < 3) {
        theDeck.shuffle()
    }
    leftCard = theDeck.nextCard
    leftCardSprite.setImage(theDeck.getCardImage(leftCard, CardSpriteSize.Size32x32))
    rightCard = theDeck.nextCard
    rightCardSprite.setImage(theDeck.getCardImage(rightCard, CardSpriteSize.Size32x32))
    playerCard = theDeck.nextCard
    playerCardSprite.setImage(theDeck.getCardImage(playerCard, CardSpriteSize.Size32x32))
}
function initCards () {
    theDeck = PlayingCards.createPokerDeck()
    theDeck.isAceHigh = true
    theDeck.shuffle()
    leftCardSprite = sprites.create(assets.image`cardback`, SpriteKind.Enemy)
    leftCardSprite.setPosition(40, 100)
    rightCardSprite = sprites.create(assets.image`cardback`, SpriteKind.Enemy)
    rightCardSprite.setPosition(120, 100)
    playerCardSprite = sprites.create(assets.image`cardback`, SpriteKind.Enemy)
    playerCardSprite.setPosition(80, 60)
}
function startRound () {
    setPromptInvisible(false)
    drawCards()
    waitingForPlayer = true
}
let rightCardSprite: Sprite = null
let leftCardSprite: Sprite = null
let theDeck: Shoe = null
let leftCard: Card = null
let playerCard: Card = null
let rightCard: Card = null
let isBetween = false
let playerChoseBetween = false
let waitingForPlayer = false
let promptSprite: fancyText.TextSprite = null
let y = 0
let prompts: string[] = []
let headerSprite: fancyText.TextSprite = null
let playerCardSprite: Sprite = null
let promptSprites: fancyText.TextSprite[] = []
initCards()
initTable()
startRound()
