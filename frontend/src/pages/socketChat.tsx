import react,{useEffect,useState} from 'react'
import {io} from "socket.io-client";
import './../index.css';
import {List,Input, Button} from 'antd';
import { ChatObject } from '../types/typeObjects';
export default function SocketChat()
{
    
    const socket = io("/",{reconnection:true});
    const [chatHistory,setChatHistory] = useState<Array<ChatObject>>([]);
    const [inputMsg,setInputMsg] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const [prevMsg,setPrevMsg] = useState<ChatObject>({userId: "",msg:"",time:""})
    useEffect(()=>{
        const getID = getRandomKey(8);
        setUserID(getID);
        socket.on("connect",()=>{});
        socket.on("disconnect",()=>{});
        socket.on("connect_error",()=>{
            setTimeout(()=>{
                socket.disconnect();
            },1000);
        })
        socket.on("c2r",(message: ChatObject) => {
            //console.log(socket.id);
            //console.log(message);
            checkMsg(message);
        })
    },[]);
    function getRandomKey(length: number){
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
    function submitMsg(){
        
        socket.volatile.emit("c1r",{userId: userID,msg:inputMsg,time:Date().toLocaleString()});
    
        
        
    }
    
    async function checkMsg(message:ChatObject){
        //console.log(prevMsg);
        //if((prevMsg.msg === message.msg && prevMsg.userId === message.userId && prevMsg.time === message.time) === false)
        //{
        console.log("GET: ",message);
        //setPrevMsg(message);
        setChatHistory((theArr)=>([...theArr,message]));
        //}
    }
    return (
    <div>
        <List dataSource={chatHistory} renderItem={
            (item) =>(
                <List.Item>
                    {item.msg}
                </List.Item>
            )
        }>

        </List>
        <Input value={inputMsg} onChange={(e)=>setInputMsg(e.target.value)} ></Input>
        <Button onClick={submitMsg}>submit</Button>
    </div>
    );
}