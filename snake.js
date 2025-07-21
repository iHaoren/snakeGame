// ambil canvas dan contextnya
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Ukuran grid
const grid = 20;
let count = 0;

// Posisi ular dan makanan
let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;
let food = { x: 320, y: 320 };
let score = 0;

// fungsi untuk update game setiap frame
function loop() {
    requestAnimationFrame(loop);
    //penyesuaian kecepatan per skor
    let speed = Math.max(2, 10 -Math.floor(score / 5));
    if (++count < speed) return;
    count = 0;

    // gerakkan ular
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // tambahkan kepala baru ke depan array
    snake.unshift(head);

    // kalau makan makanan
    if (head.x === food.x && head.y === food.y) {
        score += 1; //tambah skor
        document.getElementById("scoreDisplay").innerText = score;
        // tempatkan makanan di posisi baru
        food.x = Math.floor(Math.random() * 20) * grid;
        food.y = Math.floor(Math.random() * 20) * grid;
    } else {
        // hapus ekor ular
        snake.pop();
    }

    // game over kalau nabrak dinding
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height
    ) {
        // reset game
        snake = [{ x: 160, y: 160 }];
        dx = grid;
        dy = 0;
        score = 0;
        document.getElementById("scoreDisplay").innerText = score; // update skor
    }

    // game over kalau nabrak badan sendiri
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            snake = [{ x: 160, y: 160 }];
            dx = grid;
            dy = 0;
        }
    }

    // gambar background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // gambar makanan
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid-1, grid-1);

    // gambar ular
    ctx.fillStyle = 'lime';
    snake.forEach(part => ctx.fillRect(part.x, part.y, grid-1, grid-1));
}

// kontrol arah ular
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -grid; dy = 0;
    } else if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0; dy = -grid;
    } else if (e.key === 'ArrowRight' && dx === 0) {
        dx = grid; dy = 0;
    } else if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0; dy = grid;
    }
});

// kontrol untuk tombol di layar sentuh
document.getElementById('left').addEventListener('click', function() {
    if (dx === 0) { dx = -grid; dy = 0; }
});
document.getElementById('up').addEventListener('click', function() {
    if (dy === 0) { dx = 0; dy = -grid; }
});
document.getElementById('down').addEventListener('click', function() {
    if (dy === 0) { dx = 0; dy = grid; }
});
document.getElementById('right').addEventListener('click', function() {
    if (dx === 0) { dx = grid; dy = 0; }
});

// mulai game loop
requestAnimationFrame(loop);