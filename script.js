var character = document.getElementById("character");
var character_img = document.getElementById("char_img");
var game = document.getElementById("game");
var interval;
var counter = 0;
var upFactor = 4;
let jumping = false;
let timer = 0;

var downFactor = 1;
var currentBlocks = [
  {
    block: document.getElementById("first-block"),
    hole: document.getElementById("first-hole"),
  },
  {
    block: document.getElementById("second-block"),
    hole: document.getElementById("second-hole"),
  },
];

async function moveUp() {
  jumping = true;
  character_img.src = "duck_jump1.png";
  let jumpCount = 0;
  const interval = setInterval(() => {
    var characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    var image = document;
    if (characterTop > 6 && jumpCount < 25) {
      character.style.top = characterTop - upFactor + "px";
    }
    if (jumpCount > 30) {
      clearInterval(interval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
    if (jumpCount % 3 == 0) character_img.src = "duck_jump1.png";
    if (jumpCount % 3 == 1) character_img.src = "duck_jump2.png";
    if (jumpCount % 3 == 2) character_img.src = "duck_jump3.png";
  }, 1);
}

currentBlocks.forEach(({ hole }) =>
  hole.addEventListener("animationiteration", () => {
    var random = Math.random() * 45 + 25;
    hole.style.top = random + "%";
    counter++;
  })
);

function checkIfLost(characterLeft, characterTop, barLeft, holeTop) {
  return false;
  if (barLeft < characterLeft && barLeft + 60 > characterLeft) {
    if (characterTop < holeTop || characterTop - 140 > holeTop) {
      alert("Game over. Score: " + counter);
      clearInterval(blocks);
      location.reload();
    }
  }
}

document.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveUp();
});

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    event.preventDefault();
    moveUp();
  }
});

var blocks = setInterval(() => {
  timer++;
  var characterTop = parseFloat(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  var characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  currentBlocks.forEach(({ block, hole }) => {
    var blockLeft = parseInt(
      window.getComputedStyle(block).getPropertyValue("left")
    );
    var holeTop = parseInt(
      window.getComputedStyle(hole).getPropertyValue("top")
    );
    checkIfLost(characterLeft, characterTop, blockLeft, holeTop);
  });
  if (characterTop < 480 && !jumping) {
    character.style.top = (characterTop + downFactor).toString() + "px";
  }
  if(!jumping) {
    if (timer % 60 == 0) character_img.src = "duck_move1.png";
    if (timer % 60 == 20) character_img.src = "duck_move2.png";
    if (timer % 60 == 40) character_img.src = "duck_move3.png";
  }
}, 1);
