import React, { memo, useReducer, useCallback } from 'react';
import styled from 'styled-components';

// state management
import { actions } from '../state/actions';
import { reducer, initialState } from '../state/reducer';

// components
import Cell from './Cell';

const GameGrid = () => {
  const [
    { currentPlayer, isGameOver, icons, moves, winningCells },
    dispatch,
  ] = useReducer(reducer, initialState);

  // memoize to prevent Cell re-rendering
  const handleMove = useCallback(index => {
    dispatch({ type: actions.MOVE, payload: { cellIndex: index } });
  }, []);

  // memoize to prevent Cell re-rendering
  const getIcon = useCallback(
    index => icons[moves[moves.length - 1][index] - 1],
    [icons, moves],
  );

  return (
    <Wrapper>
      <h3>
        Player {currentPlayer} turn{' '}
        <StyledButton
          type="button"
          onClick={() => dispatch({ type: actions.SWAP_ICON })}
          aria-label="Swap Player Icons"
        >
          Swap Icons
        </StyledButton>
      </h3>
      <GridContent>
        {Array.from(Array(9).keys()).map(index => (
          <Cell
            key={index}
            index={index}
            icon={getIcon(index)}
            highlight={winningCells.includes(index)}
            isGameOver={isGameOver}
            onMove={handleMove}
          />
        ))}
      </GridContent>
      <div>
        <StyledButton
          type="button"
          aria-label="Reset"
          onClick={() => dispatch({ type: actions.RESET })}
          // disable before initial move
          disabled={moves.length === 1}
        >
          Reset
        </StyledButton>
        <StyledButton
          type="button"
          aria-label="Undo"
          onClick={() => dispatch({ type: actions.UNDO })}
          // disable before initial move
          disabled={moves.length === 1}
        >
          Undo
        </StyledButton>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  color: white;
  margin: auto;
  text-align: center;
  padding: 2em;
`;
const GridContent = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-gap: 2vw;
  justify-items: center;
  max-width: 35vw;
  margin: auto;
`;
const StyledButton = styled.button`
  background-color: darkorange;
  border: none;
  border-radius: 15px;
  color: black;
  cursor: pointer;
  padding: 1em 2em;
  margin: 1em;
  font-size: 14px;
  text-transform: uppercase;
  transition: background-color 0.3s;

  &:disabled {
    color: black;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover&:not(:disabled) {
    background-color: orange;
  }
`;

export default memo(GameGrid);
