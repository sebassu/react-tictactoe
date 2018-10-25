import React from "react";
import Board from "./Board";

class Game extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            history: [{squares: Array(9).fill(null)}],
            xIsNext: true,
            stepNumber: 0
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{this.getGameStatusToDisplayForState(current)}</div>
                    <ol>{this.getMoves()}</ol>
                </div>
            </div>
        );
    }

    getGameStatusToDisplayForState(current) {
        const winner = this.calculateWinner(current.squares);
        let status = 'Winner: ' + winner
        if (!winner) {
            status = 'Next player: ' + this.getSymbolForNextPlayer();
        }
        return status;
    }

    calculateWinner(squares) {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],
            [2, 4, 6]];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    getMoves() {
        return this.state.history.map((step, move) => {
            const desc = this.getDescriptionForMove(move)
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
    }

    getDescriptionForMove(move) {
        return move === 0 ? 'Go to move #' + move : 'Go to game start';
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.getSymbolForNextPlayer();
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    getSymbolForNextPlayer() {
        return (this.state.xIsNext ? 'X' : 'O');
    }
}

export default Game;