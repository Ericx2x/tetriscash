import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';
import Tetris from '../js/components/tetris.js';

let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'http',
  host: '138.68.54.100',
  port: 8332,
  username: 'bitcoin',
  password: 'xhFjluMJMyOXcYvF',
  corsproxy: true
});

class SubmitBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'null'
    };
  }

  handleInputChange(e) {
    let value = e.target.value;
    this.setState({
      txid: value
    });
  }

  handleSubmit(e) {
    // BITBOX.RawTransactions.SubmitBlock(this.state.txid).then((result) => {
    //   this.setState({
    //     data: result
    //   })
    // }, (err) => { console.log(err); });
    e.preventDefault();
  }

  render() {
    return (
        <Tetris>
        {({
          Gameboard,
          PieceQueue,
          points,
          linesCleared
        }) => {
          return (
            <div className="tetris-container">
              <div className="text-info">
                <p>Points: {points}</p>
                <p>Lines Cleared: {linesCleared}</p>
              </div>
              <div className="game-container">
                <Gameboard />
              </div>
              <div className="pieceQueue-container">
                <PieceQueue />
              </div>
            </div>
          )
        }}
      </Tetris>
    );
  }
}

export default SubmitBlock;