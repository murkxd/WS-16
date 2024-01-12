const board = document.getElementById('board');
const turnMessage = document.getElementById('turn');
const newGameButton = document.getElementById('new-game-button');
let currentPlayer = 'X';
let gridSize = 30;
let winningLength = 5;
let gameBoard = Array(gridSize * gridSize).fill('');
let gameActive = true;

function createCell(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            turnMessage.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            turnMessage.textContent = "It's a tie!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnMessage.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = getWinPatterns();

    return winPatterns.some(pattern =>
        pattern.every(index => gameBoard[index] !== '' && gameBoard[index] === currentPlayer)
    );
}

function getWinPatterns() {
    const winPatterns = [];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j <= gridSize - winningLength; j++) {
            winPatterns.push(Array.from({ length: winningLength }, (_, k) => i * gridSize + j + k));
        }
    }

    for (let i = 0; i <= gridSize - winningLength; i++) {
        for (let j = 0; j < gridSize; j++) {
            winPatterns.push(Array.from({ length: winningLength }, (_, k) => (i + k) * gridSize + j));
        }
    }

    for (let i = 0; i <= gridSize - winningLength; i++) {
        for (let j = 0; j <= gridSize - winningLength; j++) {
            winPatterns.push(Array.from({ length: winningLength }, (_, k) => (i + k) * gridSize + j + k));
            winPatterns.push(Array.from({ length: winningLength }, (_, k) => (i + k) * gridSize + j + winningLength - k - 1));
        }
    }

    return winPatterns;
}

function resetGame() {
    board.innerHTML = '';
    currentPlayer = 'X';
    gameBoard = Array(gridSize * gridSize).fill('');
    gameActive = true;

    turnMessage.textContent = `Player X's turn`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        createCell(i);
    }
}

for (let i = 0; i < gridSize * gridSize; i++) {
    createCell(i);
}
