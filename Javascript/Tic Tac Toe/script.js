//1. El Tablero de juego Modulo IIFE

const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setCell = (index, symbol) => {
    if (board[index] === "") {
      board[index] = symbol;
      return true;
    }
    return false;
  };
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  return { getBoard, setCell, resetBoard };
})();

//2. La Fabrica de jugadores Funcion Factory

const createPlayer = (name, symbol) => {
  return { name, symbol };
};

//3. Controlador del juego Modulo IIFE

const GameController = (function () {
  let playerX = createPlayer("Player 1", "X");
  let playerO = createPlayer("Player 2", "O");

  let activePlayer = playerX;
  let isGameOver = false;

  const getActivePlayer = () => activePlayer;

  const switchTurn = () => {
    activePlayer = activePlayer === playerX ? playerO : playerX;
  };

  const winningCombinnations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkerWinner = () => {
    const board = Gameboard.getBoard();

    for (let combo of winningCombinnations) {
      const [a, b, c] = combo;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes("")) {
      return "tie";
    }

    return null;
  };

  // Nuevo método para actualizar nombres desde afuera
  const setPlayersNames = (nameX, nameO) => {
    playerX.name = nameX.trim() !== "" ? nameX : "Player 1";
    playerO.name = nameO.trim() !== "" ? nameO : "Player 2";
  };

  const playRound = (index) => {
    if (isGameOver) return;

    const success = Gameboard.setCell(index, activePlayer.symbol);

    if (!success) {
      console.log("La casilla ya esta ocupada");
      return;
    }
    const winner = checkerWinner();
    if (winner) {
      isGameOver = true;
      if (winner === "tie") {
        console.log("Empate");
      } else {
        console.log(
          `El ganador es ${activePlayer.name} ${activePlayer.symbol}`,
        );
      }
      return;
    }
    switchTurn();
    console.log(`Turno de ${activePlayer.name} ${activePlayer.symbol}`);
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    activePlayer = playerX;
    isGameOver = false;
    console.log("El juego ha sido reiniciado, empieza el jugador 1 (X)");
  };

  return {
    playRound,
    getActivePlayer,
    resetGame,
    setPlayersNames,
    getIsGameOver: () => isGameOver,
    getBoard: Gameboard.getBoard,
  };
})();

const DisplayController = (function () {
  const boardCells = document.querySelectorAll(".cell");
  const turnMessage = document.querySelector("#turn-message");
  const resetButton = document.querySelector("#restart-btn");

  const player1Input = document.querySelector("#player1-input");
  const player2Input = document.querySelector("#player2-input");
  const startBtn = document.querySelector("#start-btn");

  const renderBoard = () => {
    const currentBoard = GameController.getBoard();
    boardCells.forEach((cell, index) => {
      cell.textContent = currentBoard[index];

      cell.classList.remove("x", "o");
      if (currentBoard[index] === "X") {
        cell.classList.add("x");
      } else if (currentBoard[index] === "O") {
        cell.classList.add("o");
      }
    });
  };
  const bindEvents = () => {
    boardCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (GameController.getIsGameOver()) return;

        const index = Number(e.target.dataset.index);

        GameController.playRound(index);
        renderBoard();

        updateMessage();
      });
    });

    resetButton.addEventListener("click", () => {
      GameController.resetGame();
      renderBoard();
      turnMessage.textContent = "¡Comienza el juego! Turno de Player 1 (X)";
      turnMessage.style.color = "#94a3b8";
    });

    startBtn.addEventListener("click", () => {
      const name1 = player1Input.value;
      const name2 = player2Input.value;

      GameController.setPlayersNames(name1, name2);
      GameController.resetGame();
      renderBoard();
      updateMessage();
    });
  };

  const updateMessage = () => {
    if (GameController.getIsGameOver()) {
      const board = GameController.getBoard();

      if (!board.includes("")) {
        turnMessage.textContent = "Empate 🤝";
      } else {
        const activePlayer = GameController.getActivePlayer();
        turnMessage.textContent = `El ganador es ${activePlayer.name} ${activePlayer.symbol}`;
        turnMessage.style.color = "#38bdf8";
      }
    } else {
      const activePlayer = GameController.getActivePlayer();
      turnMessage.textContent = `Turno de ${activePlayer.name} ${activePlayer.symbol}`;
    }
  };

  bindEvents();
  renderBoard();
  updateMessage();

  return { renderBoard };
})();
