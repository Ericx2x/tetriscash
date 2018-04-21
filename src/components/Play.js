import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Switch,
//     Redirect,
//     NavLink
//   } from 'react-router-dom';
  

let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'http',
  host: '138.68.54.100',
  port: 8332,
  username: 'bitcoin',
  password: 'xhFjluMJMyOXcYvF',
  corsproxy: true
});

class Play extends Component {
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
    // BITBOX.RawTransactions.LockUnspent(this.state.txid).then((result) => {
    //   this.setState({
    //     data: result
    //   })
    // }, (err) => { console.log(err); });
    e.preventDefault();
  }

  render() {
    return (
      <div className="Play">
        <h1 className="Play-title">Play</h1>
        <p>Your Funds: 0.133 BCH</p>
        <p>Costs .001 BCH to play!</p>
        <div><a  href="/tetrispage"><button type="submit" class="pure-button pure-button-primary">Insert BCH and Play</button>  </a> </div>
      <p>(Actually free for now)</p>
        
      </div>
    );
  }
}



export default Play;