const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 50;

const snake = [
    {x: 200, y:200},
    {x: 250, y:200}
];

const food = {
    x:90,
    y:90,
    color: "green"
}

let direction, loopId;

const drawFood = () => {
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, size, size);

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


const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, 500, 500)
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();

    loopId = setTimeout(() => {
        gameLoop();
    }, 400)
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