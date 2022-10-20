import { Game, GameStatus } from "./interfaces";

export function status(game: Game): GameStatus {
  const {
      players_number,
      board: {
        status,
        size: { width, height },
      },
      winning_sequence_length,
      next_player,
    } = game,
    playersNumber = players_number,
    board = status,
    winningSequenceLength = winning_sequence_length,
    nextPlayer = next_player;

  let result: GameStatus = {
      status: "ongoing",
      winningPlayer: null,
    },
    sequences = [], // for storing possible line sequence in board
    playerStatuses = [], // for storing player statuses
    playerTurn = [], // for storing player turn
    highestDimension = Math.max(width, height);

  // immediate invalid status
  if (
    [width, height, nextPlayer].some((each) => each < 0) ||
    winningSequenceLength < 1 ||
    winningSequenceLength > highestDimension ||
    nextPlayer > playersNumber ||
    board.length !== height
  ) {
    result.status = "invalid";
    return result;
  }

  // loop each cell of board to create possible one sequence line
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // immediate return invalid
      if (
        board[i][j] > playersNumber ||
        board[i][j] < -1 ||
        board[i].length !== width
      ) {
        result.status = "invalid";
        return result;
      }

      // define local state needed for looping
      let startIndexD = 2 * width + height - 1 + (i - j),
        startIndexCD = startIndexD + height + width - 1,
        tileValue = (tilesIndex = i, row = i, col = j) =>
          `${sequences[tilesIndex] || "."}${String(board[row][col])}.`;

      // fill sequence array based on horizontal, vertical, diagonal, counterDiagonal possible sequence
      sequences[i] = tileValue();
      sequences[height + j] = tileValue(height + j);
      sequences[startIndexD] = tileValue(startIndexD);
      sequences[startIndexCD] = tileValue(startIndexCD, board.length - 1 - i);

      // count each player turn + 1, because we have -1 for empty (shift one index)
      playerTurn[board[i][j] + 1] = (playerTurn[board[i][j] + 1] || 0) + 1;
    }
  }

  // nextPlayer move will only be counted if there is still empty tiles
  if (playerTurn[0]) playerTurn[nextPlayer + 1] += 1;

  // each player move should not be greater than 1 --> or it will be INVALID. start from 1, because we will not include empty tiles here
  for (let i = 1; i < playerTurn.length; i++) {
    for (let j = i + 1; i < playerTurn.length - 1; i++) {
      if (Math.abs(playerTurn[i] - playerTurn[j]) > 1) {
        result.status = "invalid";
        return result;
      }
    }
  }

  // There must be only one winner, if it is more, it will be INVALID status
  for (let i = 0; i < playersNumber; i++) {
    let winSequence = `.${String(`${i}.`).repeat(winningSequenceLength)}`;

    playerStatuses[i] = sequences.some((group) => group.includes(winSequence));

    if (playerStatuses[i]) {
      // if winningPlayer value exist, means there is another winner, status --> INVALID
      if (result.winningPlayer !== null) {
        result.status = "invalid";
        return result;
      }
      result = { winningPlayer: i, status: "won" };
    }
  }

  // if we don't have winner yet but tiles already full, it will be TIE status. Other than that it will be ONGOING
  if (result.winningPlayer === null && !playerTurn[0]) result.status = "tie";

  return result;
}
