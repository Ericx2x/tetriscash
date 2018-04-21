import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';

let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'http',
  host: '138.68.54.100',
  port: 8332,
  username: 'bitcoin',
  password: 'xhFjluMJMyOXcYvF',
  corsproxy: true
});


let lang = 'english'

//bitcoincash:qql6r7khtjgwy3ufnjtsczvaf925hyw49cudht57tr      keypair0
//bitcoincash:qq44vch3r6zk8cx4ylrxu0ekph20cn38uqtd29ephk      keypair1
//bitcoincash:qzcet6s09rdkzc2fjed4kkcclvu89lez5vrp4eaazm      bitcoin.com wallet
//bitcoincash:qzrjw36q8jd4q6yh03fng6ak3m5p52r8lqt8rl3mht      bitcoin.com wallet 2


// create 256 bit BIP39 mnemonic
let mnemonic = BITBOX.Mnemonic.generate(256, BITBOX.Mnemonic.wordLists()[lang])

// root seed buffer
let rootSeed = BITBOX.Mnemonic.toSeed(mnemonic);

// master HDNode
let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed);
//console.log("toxpriv: "+BITBOX.HDNode.toXPriv(masterHDNode));

// instance of transaction builder
let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash')

// amount of satoshis at vout
let originalAmount = 3395;

// txid
let txid = "f282420c607b46678437784cdbb007796257f26baa27be503e128dfb85cb7144";

//decoded OP_RETURN message
let message;
// add input txid, vout index and amount of satoshis
transactionBuilder.addInput(txid, 1)

// encode #BCHForEveryone as a buffer
//let buf = new Buffer('xxxxcxxxx');
//console.log("buf"+buf);
// encode w/ OP_RETURN
let data = BITBOX.Script.encode([
 BITBOX.Script.opcodes.OP_RETURN, 
 Buffer.from('6d02', 'hex'),
 Buffer.from('Sending another MEMO to test query.cash! (Memo made with query.cash)')
])
 
// get size of tx to calculate fee
let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 4 });

// calculate fee @ 1 sat/B
let sendAmount = originalAmount - byteCount;

// add cash address output
transactionBuilder.addOutput("1LmqnQWgr581NS5X9nLn1TZgogTbi8Mf4U", sendAmount)

// add OP_RETURN and data as output w/ 0 satoshis
transactionBuilder.addOutput(data, 0)

// xpriv
//let xpriv = 'xprv9s21ZrQH143K2bR9SZ6QoULq6gPBaNDpNGYVmwFJntfaHKCkj8dPiYdKeiyW8Ca2dKVGyEwSnsBh5dEbadQ7qbN5RAqHUmKLsQEvKBuovdQ';
// instance of bip44BCHAccount node
//let node = BITBOX.HDNode.fromXPriv(xpriv);

let node = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'/0/0");
let keyPair = BITBOX.HDNode.toKeyPair(node);

//let legacy = BITBOX.HDNode.toLegacyAddress(node)
//console.log("legacy: "+legacy)
//'1DErBHB1HXNJvW3b4dP3iyE85AR8toMvUd'

//let cashAddr = BITBOX.HDNode.toCashAddress(node)
//console.log("cashaddress: "+cashAddr)
//'bitcoincash:qzrrla7dulccne05k8xsrud44f47fv9kvuzpwsa5qp'


let redeemScript;
// sign tx
transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount)

// to raw hex
let hex = transactionBuilder.build().toHex()
console.log("hex: BITBOX.RawTransactions.sendRawTransaction(\"" + hex + "\").then((result) => { console.log(\"Broadcast Result: \"+result); }, (err) => { console.log(\"Broadcast Error: \"+err); });");

// POST to full $BCH node
//BITBOX.RawTransactions.sendRawTransaction(hex).then((result) => { console.log(result); }, (err) => { console.log(err); });
//                                          BITBOX.RawTransactions.sendRawTransaction("02000000014e4e6d742b7f52f20f19f956940ef8a3ffff5614c2b65540ea5ead2051c0b7c4010000006b483045022100b53cffb6a70397f1965250339bb1d3d6a6a2df1dd0b74f494133c6214744fed30220741f723d4520ced3cee46af9e1c10562b870fb7fa103a1c9c2e95e1a51aa599541210202078bdbe3b60611a3c2b3b9c38b0b7bd6a22796173d8d2ccb481a3c130c9db5ffffffff02063d0000000000001976a9143fa1fad75c90e247899c970c099d49554b91d52e88ac00000000000000001c6a1a5265696e6861726474202d205468756e6465722773204669737400000000").then((result) => { console.log("Broadcast Result: "+result); }, (err) => { console.log("Broadcast Error: "+err); });



class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mnemonic: mnemonic,
        lang: lang,
        hex: hex,
        message: message,
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
    // BITBOX.RawTransactions.WalletLock(this.state.txid).then((result) => {
    //   this.setState({
    //     data: result
    //   })
    // }, (err) => { console.log(err); });
    e.preventDefault();
  }

  render() {

    let childNodez = masterHDNode.derivePath(`m/44'/145'/0'/0/0`);
      let address = BITBOX.HDNode.toCashAddress(childNodez);
    let addresses = [];
    for(let i = 0; i < 10; i++) {
      let childNode = masterHDNode.derivePath(`m/44'/145'/0'/0/${i}`);
      addresses.push(<li key={i}>{BITBOX.HDNode.toCashAddress(childNode)}</li>);
    }
      
    return (
      <div className="Wallet">
        <h1 className="Wallet-title">Wallet</h1>
        
        

<div className="App">
        <div className='App-content'>
        {/* <Memoform   callbackFromParent={this.displayInfo}/> */}
          <h3>Your Generated Mnemonic: <small>(Randomly generated for now)</small></h3>  <SyntaxHighlighter language='javascript' style={ocean}>{this.state.mnemonic}</SyntaxHighlighter>
          <p></p>
          <h3>Send BCH here to update your funds: <small>(Don't actually send anything here because game is free at the moment!)</small></h3>
          <SyntaxHighlighter language='javascript' style={ocean}>{address}</SyntaxHighlighter>
          <h3>Your Wallet Funds:</h3>
          <p>0 BCH</p>
        </div>
      </div>



        
      </div>
    );
  }
}

export default Wallet;