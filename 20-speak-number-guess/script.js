const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log('randomNum:', randomNum);

window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

let recognition = new window.speechRecognition();
recognition.lang = 'en-US';

// Start recognition and game
recognition.start();

//Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  // console.log('msg:', msg);

  writeMessage(msg);
  checkNumber(msg);
}

// Check message against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is not a valid number</div>';
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <buttom class="play-again" id="play-again">Play again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

// Write message to DOM
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</spam>
  `;
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

// Play again
document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});