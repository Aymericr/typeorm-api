import {io} from "socket.io-client";
import {useEffect, useState} from 'react';


export default function Home() {
    const [socket, setSocket] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState(undefined);

    const sendMessage = async () => {
        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: 'user_1zru5fOPlrtQwmP0Hlbpyrux',
                content: input,
            }),
        }).then(response => {
            console.log(response);
            setInput(undefined);
        });

    };
    useEffect(() => {
        if (!socket) {
            setSocket(io('http://localhost:3000'));
        }
        if (socket?.connected) {
            socket.on('connect', () => {
                console.log('socket connected', socket.id, `HELLO WORLD`);
            });
            socket.on('message', (data) => {
                console.log(data);
            });
        }
    });

    const refreshAllMessages = () => {
        console.log(new Date(), 'refresh!');
        fetch('http://localhost:3000/messages', {
            method: 'GET',
            headers: {
                mode: 'no-cors',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        }).then(async (response: any) => {
            if (response.status === 200) {
                const r = await response.json();
                console.log(r);
                setMessages(r);
            }
        });
    }

    useEffect(() => {
        if (messages.length === 0 ) {
            refreshAllMessages();
        }
    });
    return (
        <>
            <p>Hello world!</p>
            <u>
                {messages && messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </u>
            <input value={input} onChange={(e) => setInput(e.target.value)}/>
            <button onClick={() => sendMessage()}>send</button>
            <br/>
            {socket &&
            <button onClick={() => socket.emit('message', `HELLO WORLD`)}>Click me</button>
            }
            <br/>
            <button onClick={() => refreshAllMessages()}>Refresh all</button>
        </>
    );
}