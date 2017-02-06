var GRID_SIZE = 300;
var CELL_SIZE = GRID_SIZE / 3;

var BORDER_THICKNESS = 2;

var SelectCellState = -1;
var CellStateEnum = {
    Empty: 0,
    X: 1,
    O: 2
};

var gameState = [
    [CellStateEnum.Empty, CellStateEnum.Empty, CellStateEnum.Empty],
    [CellStateEnum.Empty, CellStateEnum.Empty, CellStateEnum.Empty],
    [CellStateEnum.Empty, CellStateEnum.Empty, CellStateEnum.Empty]
];

var cursorPosition = {
    x: 1,
    y: 1
};

function drawGrid() {
    var canvas = document.getElementById("game-canvas");
    canvas.width = GRID_SIZE;
    canvas.height = GRID_SIZE;

    var canvasContext = canvas.getContext("2d");

    canvasContext.moveTo(0, CELL_SIZE);
    canvasContext.lineTo(GRID_SIZE, CELL_SIZE);
    canvasContext.moveTo(0, CELL_SIZE * 2);
    canvasContext.lineTo(GRID_SIZE, CELL_SIZE * 2);

    canvasContext.moveTo(CELL_SIZE, 0);
    canvasContext.lineTo(CELL_SIZE, GRID_SIZE);
    canvasContext.moveTo(CELL_SIZE * 2, 0);
    canvasContext.lineTo(CELL_SIZE * 2, GRID_SIZE);

    canvasContext.strokeStyle = "#000";
    canvasContext.stroke();

    for (var cellXIndex = 0; cellXIndex < 3; ++cellXIndex) {
        for (var cellYIndex = 0; cellYIndex < 3; ++cellYIndex) {
            drawSymbol(CellStateEnum.Empty, cellXIndex, cellYIndex);
        }
    }
};

function drawSymbol(cellState, xCoord, yCoord) {
    var canvas = document.getElementById("game-canvas");
    var canvasContext = canvas.getContext("2d");

    clearCell(xCoord, yCoord);
    switch (cellState) {
        case CellStateEnum.Empty:
            canvasContext.moveTo(xCoord * CELL_SIZE + CELL_SIZE * (1/3), yCoord * CELL_SIZE + CELL_SIZE / 2);
            canvasContext.lineTo(xCoord * CELL_SIZE + CELL_SIZE * (2/3), yCoord * CELL_SIZE + CELL_SIZE / 2);
            canvasContext.strokeStyle = "#000";
            canvasContext.stroke();
            break;
        case CellStateEnum.O:
            canvasContext.beginPath();
            canvasContext.arc(xCoord * CELL_SIZE + CELL_SIZE / 2, yCoord * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 4, 0, 2 * Math.PI);
            canvasContext.lineWidth = 2;
            canvasContext.strokeStyle = '#003300';
            canvasContext.stroke();
            break;
        case CellStateEnum.X:
            canvasContext.moveTo(xCoord * CELL_SIZE + CELL_SIZE * (1/3), yCoord * CELL_SIZE + CELL_SIZE * (1/3));
            canvasContext.lineTo(xCoord * CELL_SIZE + CELL_SIZE * (2/3), yCoord * CELL_SIZE + CELL_SIZE * (2/3));
            canvasContext.moveTo(xCoord * CELL_SIZE + CELL_SIZE * (1/3), yCoord * CELL_SIZE + CELL_SIZE * (2/3));
            canvasContext.lineTo(xCoord * CELL_SIZE + CELL_SIZE * (2/3), yCoord * CELL_SIZE + CELL_SIZE * (1/3));
            canvasContext.strokeStyle = "#000";
            canvasContext.stroke();
            break;
        case SelectCellState:
            canvasContext.setLineDash([6]);
            canvasContext.strokeRect(xCoord * CELL_SIZE + CELL_SIZE * (1/3), yCoord * CELL_SIZE + CELL_SIZE * (1/3),
                CELL_SIZE * (1/3), CELL_SIZE * (1/3));
            break;
        
        default:
            throw new Error("Unknown symbol to draw");
    }
};

function clearCell(xCoord, yCoord) {
    var canvas = document.getElementById("game-canvas");
    var canvasContext = canvas.getContext("2d");

    canvasContext.clearRect(xCoord * CELL_SIZE + BORDER_THICKNESS, yCoord * CELL_SIZE + BORDER_THICKNESS,
        CELL_SIZE - 2 * BORDER_THICKNESS, CELL_SIZE - 2 * BORDER_THICKNESS);
};

function drawCursor(cursorPosition) {
    drawSymbol(SelectCellState, cursorPosition.x, cursorPosition.y);
};

function handleArrowKeyPress(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        console.log('up');
    }
    else if (e.keyCode == '40') {
        console.log('down');
    }
    else if (e.keyCode == '37') {
       console.log('left');
    }
    else if (e.keyCode == '39') {
       console.log('right');
    }
};

function setupEventHandlers() {
    document.addEventListener('keydown', handleArrowKeyPress, false);
};

drawGrid();
drawCursor(cursorPosition);
setupEventHandlers();