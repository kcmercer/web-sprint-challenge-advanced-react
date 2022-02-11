import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    steps: 0,
    email: '',
    message: ''
  }

  // moveSquare = e => {

  //   if (e.target.id === 'up') {
  //     this.setState((state) => ({
  //       ...state,
  //       steps: state.steps + 1,
  //       y: Math.max(1, state.y - 1)
  //     }))
  //   } else if (e.target.id === 'left') {
  //     this.setState((state) => ({
  //       ...state,
  //       steps: state.steps + 1,
  //       x: Math.max(1, state.x - 1)
  //     }))
  //   } else if (e.target.id === 'right') {
  //     this.setState((state) => ({
  //       ...state,
  //       steps: state.steps + 1,
  //       x: Math.min(3, state.x + 1)
  //     }))
  //   } else if (e.target.id === 'down') {
  //     this.setState((state) => ({
  //       ...state,
  //       steps: state.steps + 1,
  //       y: Math.min(3, state.y + 1)
  //     }))
  //   } else if (e.target.id === 'reset') {
  //     const input = document.querySelector('#email')
  //     const messageBox = document.querySelector('#message')
  //     input.value = ''
  //     messageBox.value = ''

  //     this.setState((state) => ({
  //       ...state,
  //       x: 2,
  //       y: 2,
  //       steps: 0,
  //       email: '',
  //     }))
  //   } else {
  //     console.log('What is going on..?')
  //   }
  // }

  xDown = () => {
    this.state.y <= 3 && this.state.y >= 2 ? 
    this.setState({
      ...this.state, 
      y: this.state.y - 1, 
      steps: this.state.steps + 1
    }) :
    this.setState({
      ...this.state, 
      y: this.state.y === 3 ? 3 : this.state.y, 
      message: "You can't go left"
    })
  }

  yDown = () => {
    this.state.x <= 2 && this.state.x >= 1 ? 
    this.setState({
      ...this.state, 
      x: this.state.x + 1, 
      steps: this.state.steps + 1}) :
    this.setState({
      ...this.state, 
      x: this.state.x === 3 ? 3 : this.state.x, 
      message: "You can't go down"})
  }

  xUp = () => {
    this.state.y <= 2 && this.state.y >= 1 ? 
    this.setState({
      ...this.state, 
      y: this.state.y + 1, 
      steps: this.state.steps + 1}) :
    this.setState({
      ...this.state, 
      y: this.state.y === 3 ? 3 : this.state.y, 
      message: "You can't go right"})
  }

  yUp = () => {
    this.state.x <= 3 && this.state.x >= 2 ? 
    this.setState({
      ...this.state, 
      x: this.state.x - 1, 
      steps: this.state.steps + 1
    }) :
    this.setState({
      ...this.state, 
      x: this.state.x === 3 ? 3 : this.state.x, 
      message: "You can't go up"})
  }

  fullReset = () => {
      const input = document.querySelector('#email')
      const messageBox = document.querySelector('#message')
      input.value = ''
      messageBox.value = ''

    this.setState({
      ...this.state,
      x:2,
      y:2,
      steps:0,
      email: "",
      message:''
    })
  }


  onChange = e => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const input = document.querySelector('#email')
    input.value = ''

    axios.post('http://localhost:9000/api/result', this.state)
    .then(resp => {
      this.setState({
        ...this.state,
        message: resp.data.message
      })
    })
    .catch(error => {
      console.log(error)
      if (this.state.email === 'foo@bar.baz') {
        this.setState({
          ...this.state,
          message: 'foo@bar.baz failure #71'
        })
      } else {
        this.setState({
          ...this.state,
          message: 'Ouch: email must be a valid email'
        })
      }
    })
  }

  // componentDidUpdate() {
  //   const grid = document.querySelectorAll('div.square')
  //   const messageBox = document.querySelector('#message')
  //   console.log(this.state)
  //   // console.log('update')

  //   Array.from(grid).map(el => {
  //     el.classList.remove('active'),
  //     el.innerHTML = ''
  //   })

  //   // axios.post('http://localhost:9000/api/result', this.state)
  //   // .then(resp => {
  //   //   messageBox.innerHTML = resp.data.message
  //   // })
  //   // .catch(error => {
  //   //   console.log(error.message)
  //   //   messageBox.innerHTML = error.message
  //   // })

  //   if (this.state.x === 1 && this.state.y === 1) {
  //     grid[0].classList.add('active')
  //     grid[0].innerHTML = 'B'
  //   } else if (this.state.x === 1 && this.state.y === 2) {
  //     grid[3].classList.add('active')
  //     grid[3].innerHTML = 'B'
  //   } else if (this.state.x === 1 && this.state.y === 3) {
  //     grid[6].classList.add('active')
  //     grid[6].innerHTML = 'B'
  //   } else if (this.state.x === 2 && this.state.y === 1) {
  //     grid[1].classList.add('active')
  //     grid[1].innerHTML = 'B'
  //   } else if (this.state.x === 2 && this.state.y === 2) {
  //     grid[4].classList.add('active')
  //     grid[4].innerHTML = 'B'
  //   } else if (this.state.x === 2 && this.state.y === 3) {
  //     grid[7].classList.add('active')
  //     grid[7].innerHTML = 'B'
  //   } else if (this.state.x === 3 && this.state.y === 1) {
  //     grid[2].classList.add('active')
  //     grid[2].innerHTML = 'B'
  //   } else if (this.state.x === 3 && this.state.y === 2) {
  //     grid[5].classList.add('active')
  //     grid[5].innerHTML = 'B'
  //   } else if (this.state.x === 3 && this.state.y === 3) {
  //     grid[8].classList.add('active')
  //     grid[8].innerHTML = 'B'
  //   } else {
  //     console.log('Not sure how this happened...')
  //   }
  // }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y}) </h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps !== 1 ? 'times' : 'time'}</h3>
        </div>

        <div id="grid">
          <div className={this.state.x === 1 && this.state.y === 1 ? 'square active' : 'square'}>
            {this.state.x === 1 && this.state.y === 1 ? 'B' : ''}
          </div>
          <div className={this.state.x === 1 && this.state.y === 2 ? 'square active' : 'square'}>
            {this.state.x === 1 && this.state.y === 2 ? 'B' : ''}
          </div>
          <div className={this.state.x === 1 && this.state.y === 3 ? 'square active' : 'square'}>
            {this.state.x === 1 && this.state.y === 3 ? 'B' : ''}
          </div>
          <div className={this.state.x === 2 && this.state.y === 1 ? 'square active' : 'square'}>
            {this.state.x === 2 && this.state.y === 1 ? 'B' : ''}
          </div>
          <div className={this.state.x === 2 && this.state.y === 2 ? 'square active' : 'square'}>
            {this.state.x === 2 && this.state.y === 2 ? 'B' : ''}
          </div>
          <div className={this.state.x === 2 && this.state.y === 3 ? 'square active' : 'square'}>
            {this.state.x === 2 && this.state.y === 3 ? 'B' : ''}
          </div>
          <div className={this.state.x === 3 && this.state.y === 1 ? 'square active' : 'square'}>
            {this.state.x === 3 && this.state.y === 1 ? 'B' : ''}
          </div>
          <div className={this.state.x === 3 && this.state.y === 2 ? 'square active' : 'square'}>
            {this.state.x === 3 && this.state.y === 2 ? 'B' : ''}
          </div>
          <div className={this.state.x === 3 && this.state.y === 3 ? 'square active' : 'square'}>
            {this.state.x === 3 && this.state.y === 3 ? 'B' : ''}
          </div>
        </div>

        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>

        <div id="keypad">
          <button onClick={this.xDown} id="left">LEFT</button>
          <button onClick={this.yUp} id="up">UP</button>
          <button onClick={this.xUp} id="right">RIGHT</button>
          <button onClick={this.yDown} id="down">DOWN</button>
          <button onClick={this.fullReset} id="reset">reset</button>
        </div>

        <form>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input onClick={this.onSubmit} id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

// disabled={this.state.x <= 1}