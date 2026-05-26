const cells = Array.from(document.querySelectorAll(".cell"));
const status = document.querySelector("#status");
const resetButton = document.querySelector("#reset");
const modeSelect = document.querySelector("#mode");
const titleRow = document.querySelector("#titleRow");

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function updateStatus(message, state = "") {
  status.textContent = message;
  status.className = `status ${state}`.trim();
}

function updateTrainingModeIcon() {
  titleRow.classList.toggle("training-mode", modeSelect.value === "ai-training");
}

function findWinningLine() {
  return winningLines.find(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function freezeBoard() {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function handleMove(index) {
  if (gameOver || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  modeSelect.disabled = true;
  cells[index].textContent = currentPlayer;
  cells[index].setAttribute("aria-label", `Cell ${index + 1}, ${currentPlayer}`);

  const winningLine = findWinningLine();

  if (winningLine) {
    gameOver = true;
    winningLine.forEach((cellIndex) => {
      cells[cellIndex].classList.add("winning-cell");
    });
    updateStatus(`${currentPlayer} a gagné !`, "win");
    freezeBoard();
    return;
  }

  if (board.every(Boolean)) {
    gameOver = true;
    updateStatus("partie nulle", "draw");
    freezeBoard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`C'est le tour des ${currentPlayer}`);
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  modeSelect.disabled = false;
  updateStatus("X commence");

  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("winning-cell");
    cell.setAttribute("aria-label", `Empty cell ${index + 1}`);
  });
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleMove(index));
});

modeSelect.addEventListener("change", updateTrainingModeIcon);
resetButton.addEventListener("click", resetGame);
updateTrainingModeIcon();
