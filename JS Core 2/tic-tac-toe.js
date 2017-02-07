var GRID_SIZE = 300;
var CELLS_IN_ROW = 3;
var CELL_SIZE = GRID_SIZE / CELLS_IN_ROW;

var BORDER_THICKNESS = 2;

var SelectCellState = -1;
var CellStateEnum = {
    Empty: 0,
    X: 1,
    O: 2
};

var TurnDirectionEnum = {
    Left: 0,
    Right: 1,
    Up: 2,
    Down: 3
};

var PlayerEnum = {
    X: 0,
    O: 1
}

var gameState;
var gameOver;
var currentPlayer;
var cursorPosition;

function initGame() {
    gameOver = false;
    gameState = [
        [CellStateEnum.Empty, CellStateEnum.Empty, CellStateEnum.Empty],
        [CellStateEnum.Empty, CellStateEnum.Empty, CellStateEnum.Empty],
        [CellStateEnum.Empty, CellStateEnum.Empty, CellStateEnum.Empty]
    ];

    currentPlayer = PlayerEnum.X;
    cursorPosition = {
        x: 1,
        y: 1
    };

    updateCurrentPlayerText();

    var gameStatusDiv = document.getElementById("game-status");
    gameStatusDiv.className = "";

    var gameOverDiv = document.getElementById("game-over");
    gameOverDiv.className = "hidden";
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

    for (var cellXIndex = 0; cellXIndex < CELLS_IN_ROW; ++cellXIndex) {
        for (var cellYIndex = 0; cellYIndex < CELLS_IN_ROW; ++cellYIndex) {
            drawSymbol(CellStateEnum.Empty, cellXIndex, cellYIndex);
        }
    }
};

function clearCell(xCoord, yCoord) {
    var canvas = document.getElementById("game-canvas");
    var canvasContext = canvas.getContext("2d");

    canvasContext.clearRect(xCoord * CELL_SIZE + BORDER_THICKNESS, yCoord * CELL_SIZE + BORDER_THICKNESS,
        CELL_SIZE - 2 * BORDER_THICKNESS, CELL_SIZE - 2 * BORDER_THICKNESS);
};

function drawSymbol(cellState, xCoord, yCoord) {
    var canvas = document.getElementById("game-canvas");
    var canvasContext = canvas.getContext("2d");

    clearCell(xCoord, yCoord);
    canvasContext.beginPath();

    switch (cellState) {
        case CellStateEnum.Empty:
            canvasContext.moveTo(xCoord * CELL_SIZE + CELL_SIZE * (1/3), yCoord * CELL_SIZE + CELL_SIZE / 2);
            canvasContext.lineTo(xCoord * CELL_SIZE + CELL_SIZE * (2/3), yCoord * CELL_SIZE + CELL_SIZE / 2);
            canvasContext.strokeStyle = "#000";
            canvasContext.stroke();
            break;
        case CellStateEnum.O:
            canvasContext.arc(xCoord * CELL_SIZE + CELL_SIZE / 2, yCoord * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 4, 0, 2 * Math.PI);
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
            canvasContext.setLineDash([])
            break;
        
        default:
            throw new Error("Unknown symbol to draw");
    }
};

function drawCursor(cursorPosition) {
    drawSymbol(SelectCellState, cursorPosition.x, cursorPosition.y);
};

function changeCursorPosition(direction) {
    switch (direction) {
        case TurnDirectionEnum.Down:
            if (cursorPosition.y < CELLS_IN_ROW - 1) {
                ++cursorPosition.y;
            }
            break;
        case TurnDirectionEnum.Up:
            if (cursorPosition.y > 0) {
                --cursorPosition.y;
            }
            break;
        case TurnDirectionEnum.Left:
            if (cursorPosition.x > 0) {
                --cursorPosition.x;
            }
            break;
        case TurnDirectionEnum.Right:
            if (cursorPosition.x < CELLS_IN_ROW - 1) {
                ++cursorPosition.x;
            }
            break;
    }
};

function shiftTo(direction) {
    drawSymbol(gameState[cursorPosition.x][cursorPosition.y], cursorPosition.x, cursorPosition.y);
    changeCursorPosition(direction);
    drawCursor(cursorPosition);
};

function reverseDiagonalWin() {
    for (var cellIndex = 0; cellIndex < CELLS_IN_ROW; ++cellIndex) {
        if (gameState[cellIndex][CELLS_IN_ROW - cellIndex - 1] === CellStateEnum.Empty ||
            gameState[cellIndex][CELLS_IN_ROW - cellIndex - 1] !== gameState[0][CELLS_IN_ROW - 1]) {
            return false;
        }
    }

    return true;
};

function directDiagonalWin() {
    for (var cellIndex = 0; cellIndex < CELLS_IN_ROW; ++cellIndex) {
        if (gameState[cellIndex][cellIndex] === CellStateEnum.Empty || gameState[cellIndex][cellIndex] !== gameState[0][0]) {
            return false;
        }
    }

    return true;
};

function verticalWin() {
    for (var rowIndex = 0; rowIndex < CELLS_IN_ROW; ++rowIndex) {
        var win = true;

        for (var colIndex = 0; colIndex < CELLS_IN_ROW; ++colIndex) {
            if (gameState[rowIndex][colIndex] === CellStateEnum.Empty || gameState[rowIndex][colIndex] !== gameState[rowIndex][0]) {
                win = false;
            }
        }

        if (win) {
            return true;
        }
    }
};

function horizontalWin() {
    for (var colIndex = 0; colIndex < CELLS_IN_ROW; ++colIndex) {
        var win = true;

        for (var rowIndex = 0; rowIndex < CELLS_IN_ROW; ++rowIndex) {
            if (gameState[rowIndex][colIndex] === CellStateEnum.Empty || gameState[rowIndex][colIndex] !== gameState[0][colIndex]) {
                win = false;
            }
        }

        if (win) {
            return true;
        }
    }
};

function playerWins() {
    return directDiagonalWin() || reverseDiagonalWin() || verticalWin() || horizontalWin();
};

function checkGameResult() {
    if (playerWins()) {
        gameOver = true;

        var gameStatusDiv = document.getElementById("game-status");
        gameStatusDiv.className = "hidden";

        var gameOverDiv = document.getElementById("game-over");
        gameOverDiv.className = "";
    }
};

function updateCurrentPlayerText() {
    var currentPlayerElement = document.getElementById("player-name");
    currentPlayerElement.innerText = currentPlayer == PlayerEnum.O ? "O" : "X";
};

function makeTurn() {
    if (gameState[cursorPosition.x][cursorPosition.y] !== CellStateEnum.Empty) {
        return;
    }

    if (currentPlayer === PlayerEnum.X) {
        gameState[cursorPosition.x][cursorPosition.y] = CellStateEnum.X;
        currentPlayer = PlayerEnum.O;
    }
    else {
        gameState[cursorPosition.x][cursorPosition.y] = CellStateEnum.O;
        currentPlayer = PlayerEnum.X;
    }

    updateCurrentPlayerText();
    drawSymbol(gameState[cursorPosition.x][cursorPosition.y], cursorPosition.x, cursorPosition.y);
};

function resetGame() {
    initGame();
    drawGrid();
    drawCursor(cursorPosition);
};

function handleArrowKeyPress(e) {
    e = e || window.event;

    if (gameOver) {
        resetGame();
    } else {
        if (e.keyCode === 38) {
            shiftTo(TurnDirectionEnum.Up);
        }
        else if (e.keyCode === 40) {
            shiftTo(TurnDirectionEnum.Down);
        }
        else if (e.keyCode === 37) {
            shiftTo(TurnDirectionEnum.Left);
        }
        else if (e.keyCode === 39) {
            shiftTo(TurnDirectionEnum.Right);
        }
        else if (e.keyCode === 32) {
            makeTurn();
            checkGameResult();
        }
    }
};

function setupEventHandlers() {
    document.addEventListener('keydown', handleArrowKeyPress, false);
};

resetGame();
setupEventHandlers();