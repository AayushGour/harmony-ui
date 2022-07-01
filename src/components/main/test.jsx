import Peer from 'peerjs';
import React, { Component } from 'react';
import ytdl from "ytdl-core";
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.peer = new Peer("this-peer");
    }
    componentDidMount = () => {
        this.peer.on("open", (id) => {
            console.log(id)
        })
        this.peer.on("error", (error) => {
            console.log(error)
        })
    }
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <button onClick={() => { this.peer.connect("my-peer") }}>Connect</button>
                <button onClick={() => {
                    let audio = document.getElementById("audio");
                    let stream = ytdl("https://www.youtube.com/watch?v=FHVD9ft_ANw", { filter: "audioonly" });
                    audio.src = stream;
                    this.peer.call("my-peer", audio?.captureStream());
                }}>call</button>
                <audio id="audio" />
            </div>
        );
    }
}

export default Test;