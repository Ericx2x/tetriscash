import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';



class Homepage extends Component {
  render() {
    return (
      <div className='Homepage'>
      <p>Welcome to tetris.cash the first attempt to implement Bitcoin Cash into video games. Gamers will have all types of new experiences with the introduction of programmable money built into their games. Tetris cash aims to be a prototype for what is to come in the gaming world by trying to emulate classic arcade styled gaming. Players will insert BCH instead of quarters to be able to play. All to compete for that #1 spot on the games leaderboard</p>
      <div><a  href="/play"><button type="submit" class="pure-button pure-button-primary">Play</button>  </a> </div>
      </div>
    );
  }
}

export default Homepage;