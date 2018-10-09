import React, { Component } from 'react';
import logo from './logo.svg';
import ipfs from './ipfs';
import './App.css';
const Room = require('ipfs-pubsub-room')


class App extends Component {
  room = null;
  peerToSend = null;
  state = {
    room: '',
    messages: [],
    newMessage: ''
  }
  onMsgClick() {
    this.room.sendTo(this.peerToSend, this.state.newMessage)
  }
  onClick() {

    let room = Room(ipfs, this.state.room);
    this.room = room;
    room.on('peer joined', (peer) => {
      this.peerToSend = peer;
      console.log('Peer joined the room', peer);
      room.sendTo(peer, 'Privet suka');
    })

    room.on('peer left', (peer) => {
      console.log('Peer left...', peer)
    })

    // now started to listen to room
    room.on('subscribed', () => {
      console.log('Now connected!')
    })
    room.on('message', async ({from, data}) => {
      let messages = this.state.messages;
      messages.push({
        from,
        data: data.toString()
      })
      this.setState({messages})
      console.log('message received from ', from, ': ', data.toString() );
    })
  }

  render() {
    let msgs = [];
    this.state.messages.forEach((msg, i) => {
      msgs.push(<div key={i}>From: {msg.from} Message: {msg.data}</div>)
    })
    return (
      <div className="App">
        <header className="App-header">
        Current room: {this.state.room} <br/>
        <div>
          New Room id: <input onChange={(e) => this.setState({room: e.target.value})} value={this.state.room}/>
          <button onClick={this.onClick.bind(this)}>Create/Join room</button>
        </div>
        <div>
          Room messages:
          {msgs}
          Send message <input onChange={(e) => this.setState({newMessage: e.target.value})} value={this.state.newMessage}/>
          <button onClick={this.onMsgClick.bind(this)}>Send message</button>
        </div>
        </header>
      </div>
    );
  }
}

export default App;
