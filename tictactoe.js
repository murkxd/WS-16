const board = document.getElementById('board');
const resultMessage = document.getElementById('result');
const turnMessage = document.getElementById('turn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
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
      resultMessage.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
      resultMessage.textContent = "It's a tie!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      turnMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern =>
    gameBoard[pattern[0]] !== '' &&
    gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
    gameBoard[pattern[1]] === gameBoard[pattern[2]]
  );
}

for (let i = 0; i < 9; i++) {
  createCell(i);
}