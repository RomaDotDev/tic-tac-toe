import { getWinningCells, reducer, initialState } from '../state/reducer';
import { actions } from '../state/actions';

describe('get winning cells', () => {
  test('winning combination', () => {
    const move = [2, null, 1, null, 1, null, 1, 2, null];
    expect(getWinningCells(move)).toEqual([2, 4, 6]);
  });

  test('not winning combination', () => {
    const move = [1, 1, 2, 2, 1, 1, 1, 2, 2];
    expect(getWinningCells(move)).toEqual(undefined);
  });
});

describe('reducer', () => {
  const sharedState = {
    currentPlayer: 1,
    icons: ['zardoz.svg', 'square.svg'],
    isGameOver: false,
    moves: [
      [null, null, null, null, null, null, null, null, null],
      [1, null, null, null, null, null, null, null, null],
      [1, null, null, 2, null, null, null, null, null],
      [1, null, null, 2, 1, null, null, null, null],
      [1, null, null, 2, 1, null, null, 2, null],
    ],
    winningCells: [],
  };

  test('resets state', () => {
    const newState = reducer(sharedState, { type: actions.RESET });
    expect(newState).toEqual(initialState);
  });

  test(`undo initial state`, () => {
    const newState = reducer(initialState, { type: actions.UNDO });
    expect(newState).toEqual(initialState);
  });

  test('undo move', () => {
    const previousState = {
      currentPlayer: 2,
      icons: ['zardoz.svg', 'square.svg'],
      isGameOver: false,
      moves: [
        [null, null, null, null, null, null, null, null, null],
        [1, null, null, null, null, null, null, null, null],
        [1, null, null, 2, null, null, null, null, null],
        [1, null, null, 2, 1, null, null, null, null],
      ],
      winningCells: [],
    };

    const newState = reducer(sharedState, { type: actions.UNDO });
    expect(newState).toEqual(previousState);
  });

  test('makes first move', () => {
    const afterFirstMove = {
      currentPlayer: 2,
      isGameOver: false,
      icons: ['zardoz.svg', 'square.svg'],
      moves: [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, 1, null, null, null, null, null],
      ],
      winningCells: [],
    };

    const newState = reducer(initialState, {
      type: 'MOVE',
      payload: { cellIndex: 3 },
    });

    expect(newState).toEqual(afterFirstMove);
  });

  test('make winning move', () => {
    const newState = reducer(sharedState, {
      type: 'MOVE',
      payload: { cellIndex: 8 },
    });
    expect(newState.isGameOver).toBeTruthy();
  });

  test('swap icons', () => {
    const newState = reducer(sharedState, { type: actions.SWAP_ICON });
    expect(newState.icons).toEqual(['square.svg', 'zardoz.svg']);
  });
});
