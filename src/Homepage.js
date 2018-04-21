import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';



class Homepage extends Component {
  render() {
    return (
      <div className='Homepage'>
      <p>Welcome to tetris.cash the first attempt to implement Bitcoin Cash with video games. Gamers will have all types of new experiences with the introduction of programmable money built into their games. Tetris cash aims to be a prototype for what is to come in the gaming world by trying to emulate classic arcade styled gaming. Players will insert BCH instead of quarters to be able to compete for the leaderboards. Top players will be given BCH every Friday.</p>
      <div><a  href="/play"><button type="submit" class="pure-button pure-button-primary">Play</button>  </a> </div>
      </div>
    );
  }
}

export default Homepage;