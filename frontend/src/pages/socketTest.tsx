import react,{useEffect,useState} from 'react'
import {io} from "socket.io-client";

export default function SocketTest()
{
    const socket = io("http://localhost:8888");
    socket.on("hello",(message) => {
        console.log(socket.id);
        console.log(message);
    })
    return (
    <div>
        
    </div>
    );
}