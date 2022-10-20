export interface Game {
    //the number of players participating in the game
    players_number: number;
    //the number of symbols in a row from the same player needed to win a game
    winning_sequence_length: number;
    // players are defined by an index starting at 0
    // the next player is the player that needs to play next
    next_player: number;
    board: {
        //the dimension of the board, the board can also be rectangular
        size: {
            width: number;
            height: number;
        };
        //the current state of the board, -1 are empty cells,
        //the value of filled cells corresponds to the number of the player that
        //has already put his symbol in that cell
        status: number[][];
    };
};

export interface GameStatus {
    status: 'ongoing' | 'invalid' | 'tie' | 'won';
    winningPlayer: null | number;
}