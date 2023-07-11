var button = document.getElementById("escape-button");
var proximity = 300;
var isButtonMoving = false;

function moveButton() {
  if (isButtonMoving) {
    return;
  }

  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;
  var buttonWidth = button.offsetWidth;
  var buttonHeight = button.offsetHeight;

  var currentX = parseInt(button.style.left) || 0;
  var currentY = parseInt(button.style.top) || 0;

  var randomX, randomY;
  var minDistance = proximity + 50;

  do {
    randomX = Math.floor(Math.random() * (viewportWidth - buttonWidth));
    randomY = Math.floor(Math.random() * (viewportHeight - buttonHeight));
  } while (calculateDistance(currentX, currentY, randomX, randomY) < minDistance);

  if (randomX + buttonWidth > viewportWidth) {
    randomX = viewportWidth - buttonWidth;
  }
  if (randomY + buttonHeight > viewportHeight) {
    randomY = viewportHeight - buttonHeight;
  }

  button.style.transition = "left 0.5s, top 0.5s";
  button.style.left = randomX + "px";
  button.style.top = randomY + "px";

  isButtonMoving = true;

  button.addEventListener("transitionend", function() {
    isButtonMoving = false;
    updateButtonText();
  }, { once: true });
}


function calculateDistance(mouseX, mouseY, buttonX, buttonY) {
  var dx = mouseX - buttonX;
  var dy = mouseY - buttonY;
  return Math.sqrt(dx * dx + dy * dy);
}

function updateButtonText() {
  var texts = [
    "Đây nè.",
    "Ấn đi.",
    "C'mon",
    "Ấn vào đi chứ",
    "Ô mai gót",
    "Đầu hàng đi",
    "Lêu lêu đồ FA",
    "Trò chơi không hồi kết anh bạn à",
    "Game over",
    "CLICKKKK",
    "OMG 😂",
    "Có ấn đc không?",
    "GG đi bạn ê..",
    "A lêu lêu đồ ngốc",
    "Nhanh nhanh cái tay lên",
    "Có ấn được không?",
    "Đầu hàng đi....",
    "Mấy chú còn non lắm",
    "Tuổi lon nhé"
  ];
  var randomText = texts[Math.floor(Math.random() * texts.length)];
  button.innerHTML = randomText;
}

document.addEventListener("mousemove", function(event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  var buttonRect = button.getBoundingClientRect();
  var buttonX = buttonRect.left + button.offsetWidth / 2;
  var buttonY = buttonRect.top + button.offsetHeight / 2;
  var distance = calculateDistance(mouseX, mouseY, buttonX, buttonY);

  if (distance < proximity) {
    moveButton();
  }
});
