import React from 'react';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares : Array(9).fill(null),
			count: 0,
			winX : 0,
			winY : 0,
			currentMove: 'X'
		}
		this.winnerLine = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		]
	}
	isWinner = (a) => {
		// эл-т по которому кликнули
		let clickCell = a;

		for (let i = 0; i < 8; i++) {
			// текущая линия
			let currentLine = this.winnerLine[i];
			// условие победы
			if (this.state.squares[currentLine[0]] === clickCell &&
				this.state.squares[currentLine[1]] === clickCell &&
				this.state.squares[currentLine[2]] === clickCell) {
					alert(clickCell + ' победил');

					if (this.state.count % 2 === 0) {
						this.setState({winX : this.state.winX + 1})
					} else {
						this.setState({winY : this.state.winY + 1})
					}
					
					setTimeout(() => {
						this.setState({
							squares : Array(9).fill(null),
							count: 0,
							currentMove: 'X'})
					}, 1000)
			}
		}
		
	}
	clickHandler = (event) => {
		// номер квадрата по которому кликнули
		let cell = event.target.getAttribute('data');
		// состояние игрового поля
		let currentSquares = this.state.squares;

		if (currentSquares[cell] === null) {
			currentSquares[cell] = (this.state.count % 2 === 0) ? 'X' : 'O';

			this.setState({count: this.state.count + 1});
			this.setState({squares: currentSquares});
		}
		
		if (this.state.count % 2 === 0) {
			this.setState({currentMove: 'О'});
		} else {
			this.setState({currentMove: 'Х'});
		}
		// проверка выигрышного состояния
		this.isWinner(currentSquares[cell]);
	}
	clickReset = () => {
		this.setState({
			squares : Array(9).fill(null),
			count: 0,
			winX : 0,
			winY : 0,
			currentMove: 'X'})
	}
	render () {
		return (
			<div className="wrapper">
				<div className="current-move">Сейчас ходит: {this.state.currentMove}</div>
				<div className="ttt">
					<div className="ttt-grid" onClick={this.clickHandler} data="0">{this.state.squares[0]}</div>
					<div className="ttt-grid" onClick={this.clickHandler} data="1">{this.state.squares[1]}</div>
					<div className="ttt-grid" onClick={this.clickHandler} data="2">{this.state.squares[2]}</div>
					<div className="ttt-grid" onClick={this.clickHandler} data="3">{this.state.squares[3]}</div>
					<div className="ttt-grid" onClick={this.clickHandler} data="4">{this.state.squares[4]}</div>
					<div className="ttt-grid" onClick={this.clickHandler} data="5">{this.state.squares[5]}</div>
					<div className="ttt-grid" onClick={this.clickHandler} data="6">{this.state.squares[6]}</div>
					<div className="ttt-grid" onClick={this.clickHandler} data="7">{this.state.squares[7]}</div>
					<div className="ttt-grid" onClick={this.clickHandler} data="8">{this.state.squares[8]}</div>
				</div>
				<button className="button" onClick={this.clickReset}>Start new game</button>
				<div className="counter">
					<span>{this.state.winX}</span>
					<span>{this.state.winY}</span>
				</div>
			</div>
			
			
  	);
	}
  
}

export default App;
