// import Peer from 'peerjs';
import axios from 'axios';
import React from 'react';
const Main = (props) => {
    // const peer = new Peer("my-peer");
    // peer.on("open", (id) => {
    //     console.log("Open", id)
    // })
    // peer.on("connection", (conn) => {
    //     console.log("Connection", conn)
    // })
    // peer.on("call", (call) => {
    //     console.log("Call", call);
    //     call.answer();
    // })
    // peer.on("error", (error) => {
    //     console.log("error", error);
    // })
    return (
        <div>
            <h1>Hello</h1>
            <button onClick={() => {
                axios.post("/login", {
                    username: "admin",
                    password: "admin123"
                }).then(resp => {
                    console.log("On click", resp.data)
                })
            }}>Click</button>
            <button onClick={() => {
                axios.get("/api/test").then(resp => {
                    console.log("On click", resp.data)
                })
            }}>Verify</button>
        </div>
    )
}
export default Main; 
