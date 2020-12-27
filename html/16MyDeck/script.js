const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

let selectCard = true;

canvas.width = width;
canvas.height = height;

let DeckImg = new Image();
DeckImg.src = "images/cardDeck.png"

let spriteRenderer = new SpriteSheetRenderer(DeckImg, 13, 5, 54);
let selectedCardNumber = 0;

function Update() {
    context.clearRect(0, 0, height * 100, width * 200);

    let random = Math.floor(Math.random() * 55);
    spriteRenderer.DrawSprite(context, 100, 100, selectedCardNumber);
}


let Cards = [];
let Draws = 0;

function DrawCard() {
    setTimeout(function () {

        spriteRenderer.DrawSprite(context, 300, 100, Cards[Draws]);
        Draws += 1;

        if (selectedCardNumber == Cards[Draws]) {
            spriteRenderer.DrawSprite(context, 300, 100, Cards[Draws]);
            context.font = "25px serif"
            context.strokeText("Ik heb " + Draws + " kaarten uit het deck gehaalt voordat ik die van jou kreeg.", 300, 400)
            return;
        }
        if (Cards.length > 0) {
            DrawCard();
        }
    }, 50);
}


const selectionScreenCards = [];
function addCardSelectionScreen() {
    let onX = width / DeckImg.width * 11;
    let onY = height / 5;
    let cardNumber = 0;

    for (let j = 0; j < onY; j++) {
        for (let i = 0; i < onX; i++) {
            spriteRenderer.DrawSprite(context, i * DeckImg.width / 12, j * DeckImg.height / 5 + (15 * j), cardNumber)

            let pos = {};
            pos.x = i * DeckImg.width / 12;
            pos.y = j * DeckImg.height / 5 + 15 * j;

            selectionScreenCards.push(pos);
            cardNumber += 1;

            if (cardNumber >= 55) break;
        }
        if (cardNumber >= 55) break;
    }
}

DeckImg.addEventListener("load", addCardSelectionScreen);


canvas.addEventListener("mousedown", function (e) {
    if (selectCard == false) return;
    console.log(e.clientY);
    for (let i = 0; i < selectionScreenCards.length; i++) {
        if (selectionScreenCards[i].x < e.clientX && selectionScreenCards[i].x + DeckImg.width/13 > e.clientX) {
            console.log("X  " + i);
            if (selectionScreenCards[i].y < e.clientY && selectionScreenCards[i].y + DeckImg.height/5 > e.clientY) {
                console.log("succes on " + i);
                selectedCardNumber = i;

                for (let i = 0; i < 55; i++) {
                    Cards.push(i);
                }
                Cards = shuffle(Cards);
                Update();
                DrawCard();
            }
        }
    }
})

canvas.addEventListener("mousemove", function (e) {
    document.title = "X: " + e.clientX + "  Y: " + e.clientY;
})


function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}