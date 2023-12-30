import { WebSocket, WebSocketServer } from "ws";
import { load } from "ts-dotenv";
const env = load({ SERVER_PORT: Number });
const wss = new WebSocketServer({ port: Number(env.SERVER_PORT) });

wss.on("connection", (ws: WebSocket) => {
    console.log("connected!");
    ws.on("message", (data, isBinary) => {
        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data + "ロボね", { binary: isBinary });
            }
        }
    });
    ws.on("close", () => console.log("closed!"));
});
