import React, { Component } from 'react'

export class App extends Component {
  state = {
    id: 1,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    state: 'new',
    mines: 10,
  }
  // Handle Check Click
  handleClickCellCheck = async (row, col) => {
    console.log(`clicked ${row} at ${col}`)
    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`
    const body = { row: row, col: col }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.status === 200) {
      const game = await response.json()
      this.setState(game)
    }
  }

  // Handle Flag Click
  handleClickCellFlag = async (row, col) => {
    console.log(`clicked ${row} at ${col}`)
    const url = `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`
    const body = { row: row, col: col }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.status === 200) {
      const game = await response.json()
      this.setState(game)
    }
  }

  // Start New Game
  handleNewGame = async () => {
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )
    if (response.status === 200) {
      const game = await response.json()
      this.setState(game)
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>
            Minesweeper - <button onClick={this.handleNewGame}>New Game</button>
          </h1>
        </div>

        <ul>
          {this.state.board.map((boardRow, rowIndex) => {
            return boardRow.map((cell, columnIndex) => {
              return (
                <li
                  key={columnIndex}
                  onClick={e => {
                    // If Player Presses Shift Key - Flag
                    if (e.shiftKey) {
                      return this.handleClickCellFlag(rowIndex, columnIndex)
                    } else {
                      // If Player Clicks - Check
                      return this.handleClickCellCheck(rowIndex, columnIndex)
                    }
                  }}
                >
                  {cell}
                </li>
              )
            })
          })}
        </ul>
      </div>
    )
  }
}
