var canvas = document.getElementById("app");
var ctx = canvas.getContext("2d");

function drawArray(cells) {

    var cellSize = 2;
    ctx.beginPath();
    for (var y = 0; y < cells.length; y++) {
        for (var x = 0; x < cells[y].length; x++) {
            ctx.fillStyle = cells[y][x] === 1 ? "black" : "white";
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    ctx.stroke();
}

function getSum(cells, y1, x1) {

    var sum = 0;
    for (var y = -1; y < 2; y++) {
        for (var x = -1; x < 2; x++) {

            var yTemp = y1 + y;
            var xTemp = x1 + x;

            if (yTemp < 0) yTemp = cells.length - 1;
            if (yTemp > cells.length - 1) yTemp = 0;

            if (xTemp < 0) xTemp = cells.length - 1;
            if (xTemp > cells.length - 1) xTemp = 0;

            sum += cells[yTemp][xTemp];
        }
    }
    sum -= cells[y1][x1];
    return sum;
}

function updateState(cells) {
    var arr = [];
    for (var y = 0; y < cells.length; y++) {
        arr.push([]);
        for (var x = 0; x < cells[y].length; x++) {
            var sum = getSum(cells, y, x);

            if (cells[y][x] === 1 && (sum < 2 || sum > 3)) {
                arr[y].push(0);
            } else if (cells[y][x] === 1 && (sum === 2 || sum === 3)) {
                arr[y].push(1);
            } else if (cells[y][x] === 0 && sum === 3) {
                arr[y].push(1);
            } else {
                arr[y].push(0);
            }
        }
    }

    return arr;
}

function make2dArray(cols, rows) {
    var arr = [];
    for (var y = 0; y < rows; y++) {
        arr.push([]);
        for (var x = 0; x < cols; x++) {
            var rand = Math.ceil(Math.random() * 2 % 2) - 1;
            arr[y].push(rand);
        }
    }

    return arr;
}

var cells = make2dArray(300, 300);
function gameLoop() {
    drawArray(cells);
    cells = updateState(cells);
    setTimeout(gameLoop, 100);
}

gameLoop();
