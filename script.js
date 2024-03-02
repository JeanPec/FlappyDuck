var character = document.getElementById("character");
var character_img = document.getElementById("char_img");
var game = document.getElementById("game");
var interval;
var counter = 0;
var upFactor = 4;
let jumping = false;
let timer = 0;
let loosing = false;
const char_height = parseInt(
  window.getComputedStyle(character).getPropertyValue("height")
);
const gameBottom = parseInt(
  window.getComputedStyle(game).getPropertyValue("height")
);

var downFactor = 1;
var currentBlocks = [
  {
    group: document.getElementById("first-group"),
  },
  {
    group: document.getElementById("second-group"),
  },
];

async function moveUp() {
  if(loosing) return false;
  jumping = true;
  character_img.src = "./assets/duck/duck_jump1.png";
  let jumpCount = 0;
  const interval = setInterval(() => {
    if(loosing){
      clearInterval(interval);
      return false;
    }
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
    if (jumpCount % 3 == 0) character_img.src = "./assets/duck/duck_jump1.png";
    if (jumpCount % 3 == 1) character_img.src = "./assets/duck/duck_jump2.png";
    if (jumpCount % 3 == 2) character_img.src = "./assets/duck/duck_jump3.png";
  }, 1);
}

currentBlocks.forEach(({ group }) =>
  group.addEventListener("animationiteration", () => {
    var randomMove = parseInt(Math.random() * 45)+30;
    group.style.top = "-"+randomMove+"%";
    counter++;
  })
);

const looseCase = async (instant) => {
  loosing = true;
  clearInterval(blocks);
  character_img.src = "./assets/duck/duck_touched.png";
  let characterTop = parseFloat(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  character_img.src = "./assets/duck/duck_falling.png";
  character.classList.add("falling");
  const interval = setInterval(() => {
    if (characterTop > gameBottom) {
      clearInterval(interval);
      character.classList.remove("falling");
      alert("Game over. Score: " + counter);
      location.reload();
    }
    character.style.top = (characterTop + downFactor).toString() + "px";
    characterTop = parseFloat(
      window.getComputedStyle(character).getPropertyValue("top")
    );
  }, 10);
};

async function checkIfLost(
  characterLeft,
  characterTop,
  blockHighHeight,
  groupLeft,
  groupWidth,
  holeHeight
) {
  if (characterLeft > groupLeft && characterLeft < groupLeft + groupWidth) {
    if (
      characterTop < blockHighHeight ||
      characterTop > blockHighHeight + holeHeight - 10
    )
    {
    console.log(characterTop, blockHighHeight, holeHeight, groupWidth);
    looseCase();
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
  currentBlocks.forEach(({ group }) => {
    const groupStyle = window.getComputedStyle(group);

    const blockHighHeight = parseFloat(
      groupStyle.getPropertyValue("grid-template-rows").split(" ")[0]
    );
    const groupTop = parseInt(groupStyle.getPropertyValue("top"));
    const groupWidth = parseInt(groupStyle.getPropertyValue("width"));
    const groupLeft = parseFloat(groupStyle.getPropertyValue("left"));
    const holeHeight = parseFloat(groupStyle.getPropertyValue("row-gap"));
    // checkIfLost(
    //   characterLeft,
    //   characterTop,
    //   blockHighHeight + groupTop,
    //   groupLeft,
    //   groupWidth,
    //   holeHeight
    // );
  });
  if (!jumping && characterTop < gameBottom - char_height) {
    character.style.top = (characterTop + downFactor).toString() + "px";
  }
  if (!jumping) {
    if (timer % 60 == 0) character_img.src = "./assets/duck/duck_move1.png";
    if (timer % 60 == 20) character_img.src = "./assets/duck/duck_move2.png";
    if (timer % 60 == 40) character_img.src = "./assets/duck/duck_move3.png";
  }
}, 1);
