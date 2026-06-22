const cells = Array.from(document.querySelectorAll(".cell"));
const status = document.querySelector("#status");
const statusMessage = document.querySelector("#statusMessage");
const inspectRecordedMovesButton = document.querySelector("#inspectRecordedMoves");
const recordedMovesDialog = document.querySelector("#recordedMovesDialog");
const closeRecordedMovesButton = document.querySelector("#closeRecordedMoves");
const recordedMovesList = document.querySelector("#recordedMovesList");
const resetButton = document.querySelector("#reset");
const modeSelect = document.querySelector("#mode");
const titleRow = document.querySelector("#titleRow");
const trainingPanel = document.querySelector("#trainingPanel");
const aiPanel = document.querySelector("#aiPanel");
const savedMovesCount = document.querySelector("#savedMovesCount");
const savedGamesCount = document.querySelector("#savedGamesCount");
const confidenceScore = document.querySelector("#confidenceScore");
const confidenceLine = document.querySelector("#confidenceLine");
const confidenceDots = document.querySelector("#confidenceDots");
const trainModelButton = document.querySelector("#trainModel");
const clearTrainingDataButton = document.querySelector("#clearTrainingData");

const storageKey = "cia010-tictactoe-training";
const modelStorageKey = "indexeddb://cia010-tictactoe-ai";
const aiPlayer = "X";
const humanPlayer = "O";

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
let aiThinking = false;
let gameId = 0;
let previousMode = modeSelect.value;
let model = null;
let modelIsReady = false;
let isTrainingModel = false;
let lastConfidence = null;
let confidenceHistory = [];
let latestRecordedMoves = [];

let trainingData = {
  inputs: [],
  labels: [],
  savedGames: 0,
  trainedGames: 0
};

let moveHistory = createEmptyHistory();

function createEmptyHistory() {
  return {
    X: [],
    O: []
  };
}

function loadTrainingData() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));

    if (saved && Array.isArray(saved.inputs) && Array.isArray(saved.labels)) {
      trainingData = {
        inputs: saved.inputs,
        labels: saved.labels,
        savedGames: saved.savedGames || 0,
        trainedGames: saved.trainedGames || 0
      };
    }
  } catch {
    saveTrainingData();
  }
}

function saveTrainingData() {
  localStorage.setItem(storageKey, JSON.stringify(trainingData));
}

function waitForPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

async function loadSavedModel() {
  if (!window.tf) {
    updateStatus("TensorFlow.js n'est pas chargé", "draw");
    return;
  }

  try {
    model = await tf.loadLayersModel(modelStorageKey);
    modelIsReady = true;
  } catch {
    model = null;
    modelIsReady = false;
  }

  updatePanels();
}

function createModel() {
  const nextModel = tf.sequential();

  nextModel.add(tf.layers.dense({
    inputShape: [9],
    units: 27,
    activation: "relu"
  }));
  nextModel.add(tf.layers.dense({
    units: 18,
    activation: "relu"
  }));
  nextModel.add(tf.layers.dense({
    units: 9,
    activation: "softmax"
  }));

  nextModel.compile({
    optimizer: tf.train.adam(0.03),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
  });

  return nextModel;
}

function updateStatus(message, state = "", showRecordedMoves = false) {
  statusMessage.textContent = message;
  status.className = `status ${state}`.trim();
  inspectRecordedMovesButton.hidden = !showRecordedMoves;
}

function updateTrainingModeIcon() {
  const isTrainingMode = modeSelect.value === "ai-training";
  const isAiMode = modeSelect.value === "vs-ai";

  titleRow.classList.toggle("ai-icons-visible", isTrainingMode || isAiMode);
  titleRow.classList.toggle("training-mode", isTrainingMode);
}

function updatePanels() {
  trainingPanel.hidden = modeSelect.value !== "ai-training";
  aiPanel.hidden = modeSelect.value !== "vs-ai";
  savedMovesCount.textContent = trainingData.inputs.length.toLocaleString("fr-CA");
  savedGamesCount.textContent = trainingData.savedGames.toLocaleString("fr-CA");
  confidenceScore.textContent = lastConfidence === null ? "--" : `${Math.round(lastConfidence * 100)} %`;
  trainModelButton.disabled = isTrainingModel || trainingData.inputs.length === 0 || !window.tf;
  updateConfidenceChart();
}

function getConfidencePoint(confidence, index) {
  const xStart = 42;
  const xStep = 48;
  const yTop = 8;
  const yBottom = 88;
  const score = Math.max(0, Math.min(confidence ?? 0, 1));

  return {
    x: xStart + index * xStep,
    y: yBottom - score * (yBottom - yTop)
  };
}

function updateConfidenceChart() {
  const points = confidenceHistory
    .slice(0, 5)
    .map((confidence, index) => getConfidencePoint(confidence, index));

  confidenceLine.setAttribute("points", points.map(({ x, y }) => `${x},${y}`).join(" "));
  confidenceDots.textContent = "";

  points.forEach(({ x, y }) => {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    dot.setAttribute("class", "chart-dot");
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", 4);

    confidenceDots.append(dot);
  });
}

function findWinningLine(state = board) {
  return winningLines.find(([a, b, c]) => {
    return state[a] && state[a] === state[b] && state[a] === state[c];
  });
}

function getWinner(state = board) {
  const winningLine = findWinningLine(state);
  return winningLine ? state[winningLine[0]] : "";
}

function isDraw(state = board) {
  return state.every(Boolean) && !getWinner(state);
}

function availableMoves(state = board) {
  return state
    .map((cell, index) => (cell ? null : index))
    .filter((index) => index !== null);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function encodeBoardForPlayer(state, player) {
  return state.map((cell) => {
    if (!cell) {
      return 0;
    }

    return cell === player ? 1 : -1;
  });
}

function recordMove(player, index) {
  if (modeSelect.value !== "ai-training") {
    return;
  }

  moveHistory[player].push({
    board: [...board],
    input: encodeBoardForPlayer(board, player),
    label: index,
    player
  });
}

function addWinnerExamples(winner) {
  const winnerHistory = moveHistory[winner];

  if (!winnerHistory.length) {
    return;
  }

  latestRecordedMoves = winnerHistory.map(({ board: state, label, player }) => ({
    board: [...state],
    label,
    player
  }));

  winnerHistory.forEach(({ input, label }) => {
    trainingData.inputs.push(input);
    trainingData.labels.push(label);
  });

  trainingData.savedGames += 1;
  saveTrainingData();
  updatePanels();
}

function renderBoard() {
  const winningLine = findWinningLine();

  cells.forEach((cell, index) => {
    const value = board[index];
    cell.textContent = value;
    cell.disabled = gameOver || aiThinking || Boolean(value);
    cell.classList.toggle("winning-cell", Boolean(winningLine?.includes(index)));
    cell.setAttribute("aria-label", value ? `Cell ${index + 1}, ${value}` : `Empty cell ${index + 1}`);
  });
}

function freezeBoard() {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function finishGame(winner) {
  gameOver = true;

  if (winner) {
    if (modeSelect.value === "ai-training") {
      addWinnerExamples(winner);
      updateStatus(`${winner} a gagné ! Partie enregistrée.`, "win", true);
    } else if (modeSelect.value === "vs-ai" && winner === aiPlayer) {
      updateStatus("L'IA a gagné !", "ai-win");
    } else if (modeSelect.value === "vs-ai" && winner === humanPlayer) {
      updateStatus("Tu as battu l'IA !", "win");
    } else {
      updateStatus(`${winner} a gagné !`, "win");
    }
  } else {
    updateStatus("partie nulle", "draw");
  }

  freezeBoard();
  renderBoard();
}

function checkForEnd() {
  const winner = getWinner();

  if (winner || isDraw()) {
    finishGame(winner);
    return true;
  }

  return false;
}

function createRecordedBoard(move, moveNumber) {
  const item = document.createElement("article");
  const heading = document.createElement("h3");
  const previewBoard = document.createElement("div");

  item.className = "recorded-move-item";
  heading.textContent = `Coup ${moveNumber}`;
  previewBoard.className = "recorded-board";
  previewBoard.setAttribute("aria-label", `Coup enregistré ${moveNumber}`);

  move.board.forEach((value, index) => {
    const cell = document.createElement("div");
    const isRecordedMove = index === move.label;

    cell.className = "recorded-board-cell";
    cell.classList.toggle("recorded-move-cell", isRecordedMove);
    cell.textContent = isRecordedMove ? move.player : value;
    previewBoard.append(cell);
  });

  item.append(heading, previewBoard);
  return item;
}

function openRecordedMovesDialog() {
  if (!latestRecordedMoves.length) {
    return;
  }

  recordedMovesList.textContent = "";
  latestRecordedMoves.forEach((move, index) => {
    recordedMovesList.append(createRecordedBoard(move, index + 1));
  });
  recordedMovesDialog.showModal();
}

function clearRecordedMovesPreview() {
  latestRecordedMoves = [];
  recordedMovesList.textContent = "";
  inspectRecordedMovesButton.hidden = true;

  if (recordedMovesDialog.open) {
    recordedMovesDialog.close();
  }
}

function placeMark(index, player) {
  board[index] = player;
  renderBoard();
}

function handleMove(index) {
  if (gameOver || aiThinking || board[index]) {
    return;
  }

  if (modeSelect.value === "vs-ai" && currentPlayer !== humanPlayer) {
    return;
  }

  recordMove(currentPlayer, index);
  placeMark(index, currentPlayer);

  if (checkForEnd()) {
    return;
  }

  if (modeSelect.value === "vs-ai") {
    currentPlayer = aiPlayer;
    scheduleAiMove();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`C'est le tour des ${currentPlayer}`);
}

function createMoveRanking(predictions) {
  return Array.from(predictions)
    .map((confidence, index) => ({ index, confidence }))
    .sort((a, b) => b.confidence - a.confidence);
}

async function predictAiMove() {
  if (!modelIsReady || !model || !window.tf) {
    const move = randomItem(availableMoves());
    return { index: move, confidence: null };
  }

  const input = encodeBoardForPlayer(board, aiPlayer);
  const tensor = tf.tensor2d([input], [1, 9]);
  const prediction = model.predict(tensor);
  const predictionValues = await prediction.data();

  tensor.dispose();
  prediction.dispose();

  const rankedMoves = createMoveRanking(predictionValues);
  const move = rankedMoves.find(({ index }) => !board[index]);

  if (move) {
    return move;
  }

  return {
    index: randomItem(availableMoves()),
    confidence: null
  };
}

async function makeAiMove(activeGameId) {
  if (activeGameId !== gameId || gameOver) {
    return;
  }

  aiThinking = true;
  updateStatus("L'IA réfléchit...");
  renderBoard();

  const move = await predictAiMove();

  if (activeGameId !== gameId || gameOver || move.index === null || move.index === undefined) {
    aiThinking = false;
    renderBoard();
    return;
  }

  lastConfidence = move.confidence;
  confidenceHistory.push(move.confidence ?? 0);
  updatePanels();
  aiThinking = false;
  placeMark(move.index, aiPlayer);

  if (!checkForEnd()) {
    currentPlayer = humanPlayer;
    updateStatus("Ton tour : place un O");
    renderBoard();
  }
}

function scheduleAiMove() {
  aiThinking = true;
  updateStatus("L'IA réfléchit...");
  renderBoard();
  window.setTimeout(() => {
    makeAiMove(gameId);
  }, 350);
}

async function trainModel() {
  if (!window.tf) {
    updateStatus("TensorFlow.js n'est pas chargé", "draw");
    return;
  }

  if (!trainingData.inputs.length) {
    updateStatus("Aucune partie gagnante n'est enregistrée", "draw");
    return;
  }

  isTrainingModel = true;
  updatePanels();
  updateStatus("Entraînement du modèle...", "training");
  await waitForPaint();

  const xs = tf.tensor2d(trainingData.inputs, [trainingData.inputs.length, 9]);
  const labels = tf.tensor1d(trainingData.labels, "int32");
  const ys = tf.oneHot(labels, 9);
  const nextModel = createModel();
  const epochCount = trainingData.inputs.length < 12 ? 90 : 60;

  try {
    await nextModel.fit(xs, ys, {
      epochs: epochCount,
      shuffle: true,
      verbose: 0,
      callbacks: {
        onEpochEnd: async () => {
          await tf.nextFrame();
        }
      }
    });

    if (model) {
      model.dispose();
    }

    model = nextModel;
    modelIsReady = true;
    trainingData.trainedGames = trainingData.savedGames;
    saveTrainingData();
    await model.save(modelStorageKey);
    updateStatus("Le modèle est entraîné", "ai-win");
  } catch {
    nextModel.dispose();
    modelIsReady = Boolean(model);
    updateStatus("L'entraînement a échoué", "draw");
  } finally {
    xs.dispose();
    labels.dispose();
    ys.dispose();
    isTrainingModel = false;
    updatePanels();
  }
}

async function clearTrainingData() {
  trainingData = {
    inputs: [],
    labels: [],
    savedGames: 0,
    trainedGames: 0
  };
  moveHistory = createEmptyHistory();
  lastConfidence = null;
  confidenceHistory = [];
  saveTrainingData();

  if (model) {
    model.dispose();
  }

  model = null;
  modelIsReady = false;

  if (window.tf) {
    try {
      await tf.io.removeModel(modelStorageKey);
    } catch {
      // Nothing to remove.
    }
  }

  updatePanels();
  resetGame(false);
  updateStatus("Les données de l'IA sont effacées");
}

function resetGame(showModeStatus = true) {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  aiThinking = false;
  gameId += 1;
  moveHistory = createEmptyHistory();
  lastConfidence = null;
  confidenceHistory = [];
  clearRecordedMovesPreview();

  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("winning-cell");
    cell.setAttribute("aria-label", `Empty cell ${index + 1}`);
  });

  renderBoard();
  updatePanels();

  if (!showModeStatus) {
    return;
  }

  if (modeSelect.value === "ai-training") {
    updateStatus("X commence");
  } else if (modeSelect.value === "vs-ai") {
    updateStatus("L'IA commence avec X");
    scheduleAiMove();
  } else {
    updateStatus("X commence");
  }
}

function changeMode() {
  const nextMode = modeSelect.value;

  if (nextMode === "vs-ai" && !modelIsReady) {
    modeSelect.value = previousMode;
    updateTrainingModeIcon();
    updatePanels();
    updateStatus("Entraîne le modèle avant de jouer contre l'IA.", "draw");
    return;
  }

  previousMode = nextMode;
  updateTrainingModeIcon();
  updatePanels();
  resetGame();
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleMove(index));
});

modeSelect.addEventListener("change", changeMode);
resetButton.addEventListener("click", () => resetGame());
trainModelButton.addEventListener("click", trainModel);
clearTrainingDataButton.addEventListener("click", clearTrainingData);
inspectRecordedMovesButton.addEventListener("click", openRecordedMovesDialog);
closeRecordedMovesButton.addEventListener("click", () => recordedMovesDialog.close());
recordedMovesDialog.addEventListener("click", (event) => {
  if (event.target === recordedMovesDialog) {
    recordedMovesDialog.close();
  }
});

loadTrainingData();
updateTrainingModeIcon();
updatePanels();
resetGame();
loadSavedModel();
