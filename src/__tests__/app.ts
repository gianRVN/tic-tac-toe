import { status } from "../app";

describe("game", () => {
  it("tie 1", function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 2,
        },
        status: [
          [0, 1, 1],
          [0, 0, 1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "tie",
      winningPlayer: null,
    });
  });
  test("tie 2", function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 3,
        },
        status: [
          [0, 1, 0],
          [0, 1, 1],
          [1, 0, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "tie",
      winningPlayer: null,
    });
  });
  test("tie 3", function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 4,
          height: 4,
        },
        status: [
          [0, 1, 0, 0],
          [1, 1, 0, 1],
          [0, 0, 1, 1],
          [1, 0, 1, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 4,
    });
    expect(result).toEqual({
      status: "tie",
      winningPlayer: null,
    });
  });
  test("invalid 1", function () {
    const result = status({
      next_player: 1,
      board: {
        size: {
          width: 3,
          height: 2,
        },
        status: [
          [0, 0, 1],
          [0, 0, 1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "invalid",
      winningPlayer: null,
    });
  });
  test("invalid 2", function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 3,
        },
        status: [
          [1, 1, 1],
          [0, 1, 0],
          [1, 1, 1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "invalid",
      winningPlayer: null,
    });
  });
  test("invalid 3", function () {
    const result = status({
      next_player: 1,
      board: {
        size: {
          width: 4,
          height: 4,
        },
        status: [
          [1, 0, 1, 0],
          [0, 0, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 1, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "invalid",
      winningPlayer: null,
    });
  });
  test("won 1", function () {
    const result = status({
      next_player: 1,
      board: {
        size: {
          width: 3,
          height: 2,
        },
        status: [
          [1, 1, -1],
          [0, 0, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "won",
      winningPlayer: 0,
    });
  });
  test("won 2", function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 3,
        },
        status: [
          [0, 0, 1],
          [0, 1, -1],
          [1, -1, -1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "won",
      winningPlayer: 1,
    });
  });
  test("won 3", function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 4,
          height: 4,
        },
        status: [
          [0, 0, -1, 2],
          [0, 1, 2, -1],
          [1, 2, -1, -1],
          [-1, -1, 1, -1],
        ],
      },
      players_number: 3,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "won",
      winningPlayer: 2,
    });
  });
  test("ongoing 1", function () {
    const result = status({
      next_player: 1,
      board: {
        size: {
          width: 3,
          height: 2,
        },
        status: [
          [-1, -1, 0],
          [-1, 1, 0],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "ongoing",
      winningPlayer: null,
    });
  });
  test("ongoing 2", function () {
    const result = status({
      next_player: 0,
      board: {
        size: {
          width: 3,
          height: 3,
        },
        status: [
          [-1, -1, 0],
          [-1, 1, -1],
          [-1, -1, -1],
        ],
      },
      players_number: 2,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "ongoing",
      winningPlayer: null,
    });
  });
  test("ongoing 3", function () {
    const result = status({
      next_player: 2,
      board: {
        size: {
          width: 4,
          height: 4,
        },
        status: [
          [0, 0, -1, -1],
          [-1, 1, 1, -1],
          [2, -1, -1, -1],
          [-1, -1, -1, -1], // i think this one supposed to be 4 elements, I add 1 more -1 at the
        ],
      },
      players_number: 3,
      winning_sequence_length: 3,
    });
    expect(result).toEqual({
      status: "ongoing",
      winningPlayer: null,
    });
  });
});

describe("additional test case", () => {
  describe("INVALID CASE", () => {
    it("invalid: key inputted value < 0", () => {
      const result = status({
        next_player: -2,
        board: {
          size: {
            width: 3,
            height: 2,
          },
          status: [
            [0, 1, 1],
            [0, 0, 1],
          ],
        },
        players_number: 2,
        winning_sequence_length: 3,
      });
      expect(result).toEqual({
        status: "invalid",
        winningPlayer: null,
      });
    });
    it("invalid: value in the board is NOT meet condition", () => {
      const result = status({
        next_player: 1,
        board: {
          size: {
            width: 3,
            height: 2,
          },
          status: [
            [0, 4, 1],
            [0, 0, 1],
          ],
        },
        players_number: 2,
        winning_sequence_length: 3,
      });
      expect(result).toEqual({
        status: "invalid",
        winningPlayer: null,
      });
    });
    it("invalid: board size is NOT equal to width and height", () => {
      const result = status({
        next_player: -1,
        board: {
          size: {
            width: -1,
            height: 2,
          },
          status: [
            [0, 1],
            [0, 0, 1],
          ],
        },
        players_number: 2,
        winning_sequence_length: 3,
      });
      expect(result).toEqual({
        status: "invalid",
        winningPlayer: null,
      });
    });
    it("invalid: winning sequence length > board size", () => {
      const result = status({
        next_player: -1,
        board: {
          size: {
            width: 3,
            height: 2,
          },
          status: [
            [0, 1, 1],
            [0, 0, 1],
          ],
        },
        players_number: 2,
        winning_sequence_length: 4,
      });
      expect(result).toEqual({
        status: "invalid",
        winningPlayer: null,
      });
    });
    it("invalid: there is still empty tiles but next player make another turn (so it is a twice turn)", () => {
      const result = status({
        // we can see we have 3 turn from first player and 2 turn from zero player, but next player is first player again --> INVALID
        next_player: 1,
        board: {
          size: {
            width: 3,
            height: 3,
          },
          status: [
            [-1, -1, -1],
            [-1, 1, 1],
            [0, 0, 1],
          ],
        },
        players_number: 2,
        winning_sequence_length: 3,
      });
      expect(result).toEqual({
        status: "invalid",
        winningPlayer: null,
      });
    });
    it("invalid: more than one player fulfill winning sequence length", () => {
      const result = status({
        next_player: 4,
        board: {
          size: {
            width: 3,
            height: 3,
          },
          status: [
            [0, 0, 0, 0, -1],
            [2, 1, 3, 1, 3],
            [4, 2, 1, 3, 1],
            [-1, 4, 2, 3, -1],
            [-1, -1, 4, 2, 2],
          ],
        },
        players_number: 5,
        winning_sequence_length: 4,
      });
      expect(result).toEqual({
        status: "invalid",
        winningPlayer: null,
      });
    });
  });

  describe("WON CASE", () => {
    it("won: playing alone --> one player only", () => {
      const result = status({
        next_player: 0,
        board: {
          size: {
            width: 3,
            height: 5,
          },
          status: [
            [-1, -1, -1],
            [-1, -1, -1],
            [0, -1, -1],
            [0, -1, -1],
            [0, -1, -1],
          ],
        },
        players_number: 1,
        winning_sequence_length: 3,
      });
      expect(result).toEqual({
        status: "won",
        winningPlayer: 0,
      });
    });
    it("won: player > 10", () => {
      const result = status({
        next_player: 1,
        board: {
          size: {
            width: 6,
            height: 6,
          },
          status: [
            [0, 0, 0, 9, 9, 3],
            [4, 1, 1, -1, -1, -1],
            [4, -1, 2, -1, 2, 4],
            [5, 6, -1, 3, 8, 7],
            [-1, -1, -1, -1, -1, 6],
            [-1, 7, 8, -1, -1, 5],
          ],
        },
        players_number: 10,
        winning_sequence_length: 3,
      });
      expect(result).toEqual({
        status: "won",
        winningPlayer: 0,
      });
    });
  });

  describe("ONGOING CASE", () => {
    it("ongoing: playing alone --> one player only", () => {
      const result = status({
        next_player: 0,
        board: {
          size: {
            width: 3,
            height: 5,
          },
          status: [
            [-1, -1, -1],
            [-1, -1, -1],
            [0, -1, -1],
            [-1, -1, -1],
            [-1, -1, 0],
          ],
        },
        players_number: 1,
        winning_sequence_length: 3,
      });
      expect(result).toEqual({
        status: "ongoing",
        winningPlayer: null,
      });
    });
    it("ongoing: empty board", () => {
      const result = status({
        next_player: 0,
        board: {
          size: {
            width: 3,
            height: 5,
          },
          status: [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1],
          ],
        },
        players_number: 5,
        winning_sequence_length: 3,
      });
      expect(result).toEqual({
        status: "ongoing",
        winningPlayer: null,
      });
    });
  });

  describe("TIE CASE", () => {
    it("tie: total player > board size and player > 10", () => {
      const result = status({
        next_player: 15,
        board: {
          size: {
            width: 3,
            height: 5,
          },
          status: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [9, 11, 11],
            [12, 13, 14],
          ],
        },
        players_number: 16,
        winning_sequence_length: 3,
      });
      expect(result).toEqual({
        status: "tie",
        winningPlayer: null,
      });
    });
  });
});
