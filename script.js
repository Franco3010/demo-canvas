window.onload = () => {
  const canvas = document.getElementById("main");
  const ctx = canvas.getContext("2d");

  let lastUpdate = Date.now();
  const balls = [];

  const drawCircle = (ctx, x, y, radius, color) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const paddle = {
    x: 200,
    y: 280,
    width: 50,
    height: 10,
  };
  let x = 200;
  let y = 280;

  let accumulate = 0;

  (function loop() {
    const elapsed = Date.now() - lastUpdate;
    lastUpdate = Date.now();
    const delta = elapsed / 1000;

    accumulate += delta;
    if (accumulate >= 3) {
      accumulate = 0;
      balls.push({
        x: Math.random() * 400,
        y: 0,
      });
    }

    for (let ball of balls) {
      ball.y += 50 * delta;
    }

    ctx.clearRect(0, 0, 400, 300);

    for (let ball of balls) {
      drawCircle(ctx, ball.x, ball.y, 10, "green");
    }

    ctx.fillStyle = "blue";
    ctx.fillRect(
      paddle.x - paddle.width / 2,
      paddle.y - paddle.height / 2,
      paddle.width,
      paddle.height
    );

    requestAnimationFrame(loop);
  })();
};
