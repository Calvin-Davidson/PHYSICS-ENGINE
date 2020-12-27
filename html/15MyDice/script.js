//2400  -  960
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight/1.5;

canvas.width = width;
canvas.height = height;

let DiceRolls = [];
for (let i = 0; i < 12; i++) DiceRolls[i] = 0;

let Dice = new Image();
Dice.src = "images/Dice.png"


function Update() {
    context.clearRect(0, 0, height, width);

    let Dice1 = Math.floor(Math.random() * 6) + 1;
    let Dice2 = Math.floor(Math.random() * 6) + 1;

    context.drawImage(Dice, 0 + (Dice1 * (Dice.width/6) - (Dice.width/6)), 0, Dice.width/6, Dice.height, 50, 50, 100, 100)
    context.drawImage(Dice, 0 + (Dice2 * (Dice.width/6) - (Dice.width/6)), 0, Dice.width/6, Dice.height, 200, 50, 100, 100)

    let dice3 = Dice1 + Dice2

    DiceRolls[dice3-1] += 1;

}


document.addEventListener("keyup", function (e) {
  if (e.keyCode == 32) {
      Update()
      UpdateScores()
  }
})

function Loop(AantalKeer) {
    for (let i = 0; i < AantalKeer; i++) {
        Update();
        UpdateScores();
    }
}

function UpdateScores() {
    document.getElementById("Een").innerHTML = DiceRolls[0];
    document.getElementById("Twee").innerHTML = DiceRolls[1];
    document.getElementById("Drie").innerHTML = DiceRolls[2];
    document.getElementById("Vier").innerHTML = DiceRolls[3];
    document.getElementById("Vijf").innerHTML = DiceRolls[4];
    document.getElementById("Zes").innerHTML = DiceRolls[5];
    document.getElementById("Zeven").innerHTML = DiceRolls[6];
    document.getElementById("Acht").innerHTML = DiceRolls[7];
    document.getElementById("Negen").innerHTML = DiceRolls[8];
    document.getElementById("Tien").innerHTML = DiceRolls[9];
    document.getElementById("Elf").innerHTML = DiceRolls[10];
    document.getElementById("Twaalf").innerHTML = DiceRolls[11];
}


document.getElementById("loop").addEventListener("click", function () {
    let loopCount = document.getElementById("loopCount").value;
   if (!Number.isInteger(Number.parseInt(loopCount))) {
       console.log("Geen number:   " + loopCount)
       return;
   }
   let loopAmount = Number.parseInt(document.getElementById("loopCount").value)
   Loop(loopAmount);
});
