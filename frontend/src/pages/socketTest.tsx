import react,{useEffect,useState} from 'react'
import {io} from "socket.io-client";
import { isConstructorDeclaration } from 'typescript';
import { MouseEventObject, MousePosition,SocketInfo } from '../types/typeObjects';
import './../index.css';
export default function SocketTest()
{
    
    const socket = io("/");
    const [mousePos, setMousePos] = useState<MousePosition>({
        left: 0, top: 0
    });
    const [myColor,setMyColor] = useState<string>("red");
    useEffect(()=>{
        setColor();
    },[]);
    function setColor(){
        const colorCodeR = getRandomKey();
        const colorCodeG = getRandomKey();
        const colorCodeB = getRandomKey();
        
        const rgbColor = `rgb(${colorCodeR},${colorCodeG},${colorCodeB})`;
        console.log(rgbColor);
        setMyColor(rgbColor);
    }
    function handleMouseMove(e: MouseEventObject){
        //console.log(e);
        setMousePos({left:e.clientX,top:e.clientY});
        socket.emit("c1r",{rgb: myColor,left:e.clientX,top:e.clientY} as SocketInfo);
    }
    socket.on("c2r",(message) => {
        //console.log(socket.id);
        //console.log(message);
        //frientUser(message);
        
    })
    function frientUser(socketInfo:SocketInfo){
        return (<div style={{
            width: "50px",
            height: "50px",    
            background: socketInfo.rgb,
            position: "absolute",
            left: socketInfo.left,
            top: socketInfo.top
            }}></div>);
    }
    function getRandomKey(){
        const mini = 10;
        const maxi = 240;
        const result = mini+Math.floor(Math.random()*(maxi-mini));
        return result;
    }
    return (
    <div style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999
    }} onMouseMove={(e)=>{handleMouseMove(e)}}>
        <div style={{
            width: "50px",
            height: "50px",    
            background: myColor,
            position: "absolute",
            left: mousePos.left,
            top: mousePos.top,
            transform: "translate(-50%,-50%)"}}></div>
    </div>
    );
}