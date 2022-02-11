import React from 'react'

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    steps: 0,
    email: ''
  }

  moveSquare = e => {
    console.log('Click Registered', e.target.id)
    if (e.target.id === 'up') {
      console.log('Clicked Up Button')
      this.setState((state) => ({
        ...state,
        steps: state.steps + 1,
        y: state.y - 1
      }))
    } else if (e.target.id === 'left') {
      console.log('Clicked Left Button')
      this.setState((state) => ({
        ...state,
        steps: state.steps + 1,
        x: state.x - 1
      }))
    } else if (e.target.id === 'right') {
      console.log('Clicked Right Button')
      this.setState((state) => ({
        ...state,
        steps: state.steps + 1,
        x: state.x + 1
      }))
    } else if (e.target.id === 'down') {
      console.log('Clicked Down Button')
      this.setState((state) => ({
        ...state,
        steps: state.steps + 1,
        y: state.y + 1
      }))
    } else if (e.target.id === 'reset') {
      console.log('Clicks Reset')
      this.setState((state) => ({
        ...state,
        x: 2,
        y: 2,
        steps: 0,
      }))
    } else {
      console.log('What is going on..?')
    }
  }

  componentDidUpdate() {
    console.log('Update!')
    if (this.state.x === 1 && this.state.y === 1) {
      console.log('On Square (1, 1)')
    } else if (this.state.x === 1 && this.state.y === 2) {
      console.log('On Square (1, 2)')
    } else if (this.state.x === 1 && this.state.y === 3) {
      console.log('On Square (1, 3)')
    } else if (this.state.x === 2 && this.state.y === 1) {
      console.log('On Square (2, 1)')
    } else if (this.state.x === 2 && this.state.y === 2) {
      console.log('On Square (2, 2)')
    } else if (this.state.x === 2 && this.state.y === 3) {
      console.log('On Square (2, 3)')
    } else if (this.state.x === 3 && this.state.y === 1) {
      console.log('On Square (3, 1)')
    } else if (this.state.x === 3 && this.state.y === 2) {
      console.log('On Square (3, 2)')
    } else if (this.state.x === 3 && this.state.y === 3) {
      console.log('On Square (3, 3)')
    } else {
      console.log('Not sure how this happened...')
    }
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x},{this.state.y}) </h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button onClick={this.moveSquare} id="left">LEFT</button>
          <button onClick={this.moveSquare} id="up">UP</button>
          <button onClick={this.moveSquare} id="right">RIGHT</button>
          <button onClick={this.moveSquare} id="down">DOWN</button>
          <button onClick={this.moveSquare} id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
