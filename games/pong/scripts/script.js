const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

window.addEventListener('resize', keepAspectRatioOfCanvas);

document.addEventListener('keydown', ({ code }) => {
  if (code === 'KeyW' || code === 'KeyS') {
    objects.player1.movement.up = code === 'KeyW' ? true : false;
    objects.player1.movement.down = code === 'KeyS' ? true : false;
  }

  if (code === 'ArrowUp' || code === 'ArrowDown') {
    objects.player2.movement.up = code === 'ArrowUp' ? true : false;
    objects.player2.movement.down = code === 'ArrowDown' ? true : false;
  }
});

document.addEventListener('keyup', ({ code }) => {
  if (code === 'KeyW' || code === 'KeyS') {
    objects.player1.movement.up = code === 'KeyW' && false;
    objects.player1.movement.down = code === 'KeyS' && false;
  }

  if (code === 'ArrowUp' || code === 'ArrowDown') {
    objects.player2.movement.up = code === 'ArrowUp' && false;
    objects.player2.movement.down = code === 'ArrowDown' && false;
  }
});

function keepAspectRatioOfCanvas() {
  const width = window.innerWidth * 0.8;
  const height = (9 / 16) * width;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

function drawUI(context) {
  context.fillStyle = '#F9F6DE';
  context.fillRect(1280 / 2, 0, 6, 1280);

  context.font = '50px Arial';
  context.fillText(`${score.player1}`, 1280 / 2 - 70, 50);
  context.fillText(`${score.player2}`, 1280 / 2 + 45, 50);
}

let objects = {};
let score = {
  player1: 0,
  player2: 0,
};

function init() {
  canvas.width = 1280;
  canvas.height = 720;

  const paddleSize = {
    width: 30,
    height: 150,
    color: '#F9F6DE',
  };

  const player1 = new Paddle({
    ...paddleSize,
    x: 40,
    y: 720 / 2,
  });

  const player2 = new Paddle({
    ...paddleSize,
    x: 1280 - 40,
    y: 720 / 2,
  });

  objects.player1 = player1;
  objects.player2 = player2;

  const ball = new Ball({
    width: 30,
    height: 30,
    x: 1280 / 2,
    y: 720 / 2,
    color: '#90D1A3',
    velocity: 6,
  });

  objects.ball = ball;

  keepAspectRatioOfCanvas();
  requestAnimationFrame(update);
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawUI(context);

  for (let objectName in objects) {
    const object = objects[objectName];

    if (object instanceof Paddle || object instanceof Ball) {
      object.move(objects);
    }

    object.draw(context);
  }

  requestAnimationFrame(update);
}

init();
