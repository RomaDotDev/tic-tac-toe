import { actions } from './actions';
import zardoz from '../img/zardoz.svg';
import square from '../img/square.svg';

export const initialState = {
  currentPlayer: 1,
  isGameOver: false,
  icons: [zardoz, square],
  moves: [Array(9).fill(null)],
  winningCells: [],
};

export const getWinningCells = currentMove => {
  // all possible winning combinations for 3x3 matrix
  const winningCombinations = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // search for at least one winning combination in current move state
  return winningCombinations.find(
    ([one, two, three]) =>
      currentMove[one] !== null &&
      currentMove[one] === currentMove[two] &&
      currentMove[one] === currentMove[three],
  );
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.MOVE:
      const { cellIndex } = action.payload;
      const newMove = [...state.moves[state.moves.length - 1]];
      newMove[cellIndex] = state.currentPlayer;
      const winningCells = getWinningCells(newMove);

      // if the move is not winning
      if (typeof winningCells === 'undefined') {
        return {
          ...state,
          moves: [...state.moves, newMove],
          currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        };
      } else {
        // if player won
        return {
          ...state,
          moves: [...state.moves, newMove],
          isGameOver: true,
          winningCells,
        };
      }
    case actions.UNDO:
      return {
        ...state,
        isGameOver: false,
        winningCells: [],
        moves:
          // erase last moves except initial one
          state.moves.length > 1
            ? state.moves.slice(0, state.moves.length - 1)
            : state.moves,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      };
    case actions.SWAP_ICON:
      return {
        ...state,
        icons: state.icons.reverse(),
      };
    case actions.RESET:
      return initialState;
    default:
      throw new Error();
  }
};
