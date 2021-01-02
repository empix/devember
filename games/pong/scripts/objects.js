class GenericObject {
  constructor({ width, height, x, y, color, velocity }) {
    this.width = width;
    this.height = height;

    this.x = x - this.width / 2;
    this.y = y - this.height / 2;

    this.color = color || '#fff';
    this.velocity = velocity || 10;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  isColliding(object) {
    const colliders = {
      right: this.x + this.width,
      left: this.x,
      top: this.y,
      bottom: this.y + this.height,
    };

    const objectColliders = {
      right: object.x + object.width,
      left: object.x,
      top: object.y,
      bottom: object.y + object.height,
    };

    return (
      objectColliders.right > colliders.left &&
      objectColliders.top < colliders.bottom &&
      objectColliders.left < colliders.right &&
      objectColliders.bottom > colliders.top
    );
  }
}

class Paddle extends GenericObject {
  constructor(data) {
    super({ ...data });

    this.movement = { up: false, down: false };
  }

  move() {
    if (this.movement.up && this.y > 0) {
      this.y -= this.velocity;
    }

    if (this.movement.down && this.y < 720 - this.height) {
      this.y += this.velocity;
    }
  }
}

class Ball extends GenericObject {
  constructor(data) {
    super({ ...data });

    this.direction = {
      x: Math.random() < 0.5 ? -1 : 1,
      y: Math.random() < 0.5 ? -1 : 1,
    };
  }

  move({ player1, player2 }) {
    if (this.x < 0) {
      score.player2++;
      this.reset();
    } else if (this.x > 1280) {
      score.player1++;
      this.reset();
    }

    if (this.isColliding(player1)) {
      this.direction.x = 1;
    } else if (this.isColliding(player2)) {
      this.direction.x = -1;
    }

    if (this.y <= 0 || this.y >= 720 - this.width) {
      this.direction.y *= -1;
    }

    this.x += this.velocity * this.direction.x;
    this.y += this.velocity * this.direction.y;
  }

  reset() {
    this.x = 1280 / 2;
    this.y = 720 / 2;
    this.direction = {
      x: Math.random() < 0.5 ? -1 : 1,
      y: Math.random() < 0.5 ? -1 : 1,
    };
  }
}
