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
    getBoard: Gameboard.getBoard,
  };
})();
