const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [
    {x: 200, y:200},
    {x: 230, y:200}
];

let direction, loopId;


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

const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, 500, 500);
    moveSnake();
    drawSnake();

    loopId = setTimeout(() => {
        gameLoop();
    }, 300)
}

gameLoop();

document.addEventListener("keydown", ({key}) => {
    switch(key){
        case "ArrowRight":
            direction = "right";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowUp":
           direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;    
    }
        
})