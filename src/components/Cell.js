import React, { memo } from 'react';
import styled from 'styled-components';

const Cell = ({ index, icon, isGameOver, highlight, onMove }) => {
  return (
    <ButtonCell
      onClick={() => onMove(index)}
      disabled={isGameOver || icon}
      highlight={highlight}
      icon={icon}
      aria-label="Grid Cell"
    />
  );
};

// bypass icon and highlight props to styled component
const ButtonCell = styled.button`
  background-image: url(${({ icon }) => (icon ? icon : '')});
  background-color: gray;
  border: 3px solid
    ${({ highlight }) => (highlight ? 'darkorange' : 'transparent')};
  border-radius: 2vw;
  color: white;
  height: 10vw;
  transition: background-color 0.3s;
  user-select: none;
  width: 10vw;

  &:hover&:not(:disabled) {
    background-color: lightgray;
    cursor: pointer;
  }
`;

export default memo(Cell);
