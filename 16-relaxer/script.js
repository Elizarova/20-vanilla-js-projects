const container = document.getElementById('container');
const text = document.getElementById('text');

const totlaTime = 7500;
const breatheTime = totlaTime / 5 * 2;
const holdTime = totlaTime / 5;

breathAnimation();

function breathAnimation() {

  text.innerText = 'Breath In!';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Hold!';

    setTimeout(() => {
      text.innerText = 'Breath Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totlaTime);