
const width = window.innerWidth;
let BALLSIZE;

if (width < 600) {
  BALLSIZE = 40; // Mobile
} else if (width < 1024) {
  BALLSIZE = 36; // Tablet
} else {
  BALLSIZE = 24; // Desktop
}

const IMPECTRADIUS = BALLSIZE * 5;

const balls = [];
const ballsDiv = document.querySelector('.balls');
const shadowsDiv = document.querySelector('.shadows');
const baseLight = document.querySelector('.baseLight');

document.body.style.setProperty('--ball-size', `${BALLSIZE}px`);

for (let x = -7; x < 8; x += 2) {
  for (let y = -5; y < 6; y += 2) {
    createBall(x, y);
  }
}

function createBall(x, y) {
  const ball = {
    div: document.createElement('div'),
    shadow: document.createElement('div'),
    x: x * BALLSIZE,
    y: y * BALLSIZE,
  };

  ball.div.classList.add('ball');
  ball.div.style.left = `${ball.x - BALLSIZE / 2}px`;
  ball.div.style.top = `${ball.y - BALLSIZE / 2}px`;
  ball.div.style.setProperty('--hue', (x + y) * 12);

  ball.shadow.classList.add('shadow');
  ball.shadow.style.left = `${ball.x}px`;
  ball.shadow.style.top = `${ball.y - BALLSIZE / 2}px`;

  ballsDiv.appendChild(ball.div);
  shadowsDiv.appendChild(ball.shadow);

  balls.push(ball);
}

function updateLight(mx, my) {
  baseLight.style.transform = `translate(${mx}px, ${my}px)`;

  balls.forEach((ball) => {
    const dx = ball.x - mx;
    const dy = ball.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < IMPECTRADIUS) {
      const distFactor = (IMPECTRADIUS - Math.min(dist, IMPECTRADIUS)) / IMPECTRADIUS;
      const angle = Math.atan2(dy, dx);

      ball.div.style.setProperty('--dist-factor', distFactor);
      ball.div.style.setProperty('--angle', angle);

      ball.shadow.style.setProperty('--dist-factor', distFactor);
      ball.shadow.style.setProperty('--angle', angle);
    } else {
      ball.div.style.setProperty('--dist-factor', 0);
      ball.shadow.style.setProperty('--dist-factor', 0);
    }
  });
}

// Mouse support
window.addEventListener('mousemove', (e) => {
  const mx = e.clientX - (window.innerWidth / 2);
  const my = e.clientY - (window.innerHeight / 2);
  updateLight(mx, my);
});

// Touch support
window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    const mx = touch.clientX - (window.innerWidth / 2);
    const my = touch.clientY - (window.innerHeight / 2);
    updateLight(mx, my);
  }
});
