import React from 'react';
import { Board } from '.';
import { GameDiv, GameInfoDiv } from './GameStyle';

export class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coordinates: [null, null],
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || this.calculateWinnder(squares)) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        coordinates: this.coordinates(i),
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  calculateWinnder(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    // there's a winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }

    // it's a draw
    if (! squares.includes(null)) {
      return '-';
    }

    // game is in progress
    return null;
  }
  
  coordinates(i) {
    const x = Math.floor(i / 3);
    const y = i % 3;
    return [x, y];
  }  

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinnder(current.squares);

    const moves = history.map((step, move) => {
      let description = move ? 'Go to move #' + move : 'Go to game start';
      if (move) description += '(' + step.coordinates[0] + ', ' + step.coordinates[1] + ')';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });

    let status = '';
    if (winner === '-') {
      status = `It's a draw`;
    } else if (winner) {
      status = 'Winnser is ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <GameDiv>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <GameInfoDiv>
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </GameInfoDiv>
      </GameDiv>
    );
  }
}