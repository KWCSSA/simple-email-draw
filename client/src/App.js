import React from 'react';
import './App.css';

class App extends React.PureComponent {
	state = { result: '结果', index: 0, draw: '' };

	fake = [
		'aisodifjxxxxx@gmail.com',
		'aoisdjfoaioi@qq.com',
		'siuu18298@fire.com',
		'aofibjoaoi@uwaterloo.ca',
		'maosdijbi3@gmail.com',
		'asdoibjoas@163.com',
		'guboaodifi@195.com'
	];

	roll = setInterval(() => {
		if (this.state.index < 6) {
			this.setState({
				index: this.state.index + 1,
				result: this.fake[this.state.index + 1]
			});
		} else {
			this.setState({
				index: 0,
				result: this.fake[0]
			});
		}
	}, 10);

	componentDidMount() {
		clearInterval(this.roll);
	}

	draw(type) {
		if (type === 'start') {
			this.roll = setInterval(() => {
				if (this.state.index < 6) {
					this.setState({
						index: this.state.index + 1,
						result: this.fake[this.state.index + 1]
					});
				} else {
					this.setState({
						index: 0,
						result: this.fake[0]
					});
				}
			}, 10);
			fetch('http://localhost:8081/draw')
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					this.setState({
						draw: data.winner
					});
				});
		} else {
			clearInterval(this.roll);
			this.setState({
				result: this.state.draw
			});
		}
	}

	render() {
		return (
			<div className='app'>
				<h1>{this.state.result}</h1>
				<div className='buttons'>
					<button type='button' className='btn btn-primary btn-lg font-weight-bold' onClick={() => this.draw('start')}>
						开始
					</button>
					<button type='button' className='btn btn-warning btn-lg font-weight-bold' onClick={() => this.draw('stop')}>
						停止
					</button>
				</div>
			</div>
		);
	}
}

export default App;
