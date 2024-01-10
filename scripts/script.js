const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const score = document.querySelector(".scoreValue");
const finalScore = document.querySelector(".finalScore > span");
const menu = document.querySelector(".menuScreen");
const buttonPlay = document.querySelector(".btnPlay");

const size = 50;

const audio = new Audio('../assets/audio.mp3');

const snake = [
    {x: 200, y:200}
];

const incrementScore = () => {
    score.innerText = parseInt(score.innerText) + 10;
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 50) * 50;
}

const randomColor = () => {
    let red, green, blue;

    red = randomNumber(0, 255);
    green = randomNumber(0, 255);
    blue = randomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
}


const food = {
    x:randomPosition(),
    y:randomPosition(),
    color: randomColor(),
}

let direction, loopId;

const drawFood = () => {

    const { x, y, color} = food;

    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = food.color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;

}

const drawSnake = () => {
    ctx.fillStyle = "#DDD";
    snake.forEach((position, index) => {

        if(index == snake.length -1){
            ctx.fillStyle = "#EEE"
        }

        ctx.fillRect(position.x, position.y, size, size);
    })
}

const moveSnake = () => {
    if (!direction) return;

    const head = snake[snake.length - 1];

    switch (direction){
        case "right": 
            snake.push({x:head.x + size, y: head.y});
            break;
        case "left": 
            snake.push({x:head.x - size, y: head.y});
            break; 
        case "down": 
            snake.push({x:head.x, y: head.y + size});
            break; 
        case "up": 
            snake.push({x:head.x, y: head.y - size}); 
            break;        
    }
    snake.shift();
}

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";

    
    for (let i = 50; i < canvas.width; i += 50){
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 500);
    
        ctx.stroke();   
        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(500, i);
    
        ctx.stroke();    
    }
    
}

const checkEat = () => {
    const head = snake[snake.length - 1];
    
    if(head.x == food.x && head.y == food.y){
        incrementScore();
        snake.push(head);
        audio.play();

        let x = randomPosition();
        let y = randomPosition();

        while (snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x;
        food.y = y;
        food.color = randomColor();
    }

    
}

const checkCollision = () => {
    const head = snake[snake.length -1];

    const neckIndex = snake[snake.length -1];

    const wallCollision = head.x < 0 || head.x > (canvas.width - size) || head.y < 0 || head.y > (canvas.height - size)

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y;
    })

    if(wallCollision || selfCollision){
        alert("Você perdeu.");
        gameOver();
    }
}

const gameOver = () => {
    direction = undefined;
    menu.style.display = "flex";
    finalScore.innerText = score;
    canvas.style.filter = "blur(5px)"
}

const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, 500, 500)
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();

    loopId = setTimeout(() => {
        gameLoop();
    }, 400)
}

gameLoop();

document.addEventListener("keydown", ({key}) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
        
})

buttonPlay.addEventListener("click", () => {
    score.innerHTML = "00";
    menu.style.display = "none"
})