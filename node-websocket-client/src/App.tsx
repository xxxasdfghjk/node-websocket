import { useState } from "react";
import "./App.css";
import ConnectedPage from "../component/templates/ConnectedPage";
import DisconnectedPage from "../component/templates/DisconnectedPage";
import React from "react";

const SEVER_URL = "ws://localhost:3333";
export type Message = {
    createdAt: string;
    createdBy: string;
    content: string;
    isYou: boolean;
};

const getCurrentTime = () => {
    const twoDigit = (num: number) => (num < 10 ? "0" + num : num);
    const nowTime = new Date();
    const nowHour = twoDigit(nowTime.getHours());
    const nowMin = twoDigit(nowTime.getMinutes());
    const nowSec = twoDigit(nowTime.getSeconds());
    return nowHour + ":" + nowMin + ":" + nowSec;
};

const App = () => {
    const [webSocketClient, setWebSocketClient] = useState<WebSocket | undefined>(undefined);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [messageList, setMessageList] = useState<Message[]>([]);
    const pushMessage = (message: Message) => {
        setMessageList((prev: Message[]) => [...prev, message]);
    };
    const onClick = () => {
        const connection = new WebSocket(SEVER_URL);
        connection.onmessage = (event) => {
            console.log(event.data);
        };
        connection.onopen = () => {
            setIsConnected(true);
        };
        connection.onmessage = function (event) {
            pushMessage({ createdAt: getCurrentTime(), createdBy: "SERVER", content: event.data, isYou: false });
        };
        connection.onclose = function () {
            setIsConnected(false);
        };
        setWebSocketClient(connection);
    };
    React.useEffect(() => {
        return () => {
            webSocketClient?.close();
        };
    }, []);

    const onSubmit = (message: string) => {
        pushMessage({ createdAt: getCurrentTime(), createdBy: "YOU", content: message, isYou: true });
        webSocketClient?.send(message);
    };
    return isConnected ? (
        <ConnectedPage onSubmitButton={onSubmit} messageList={messageList}></ConnectedPage>
    ) : (
        <DisconnectedPage onClickButton={onClick}></DisconnectedPage>
    );
};

export default App;
