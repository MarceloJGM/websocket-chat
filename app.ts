import { serve } from "bun";
import index from "./web/index.html";

const server = serve({
    port: process.env.PORT || 3000,
    routes: {
        "/": index,
    },

    fetch(req, server) {
        if (server.upgrade(req)) {
            return;
        }

        return new Response("Upgraded failed", { status: 500 });
    },

    websocket: {
        open(ws) {
            console.log("Connected");
            ws.send("Connected");
        },

        message(ws, message) {
            console.log(`Message: ${message}`);
            ws.send(message);
        },

        close(ws, code, reason) {
            console.log(`Code: ${code}, For: ${reason}`);
            ws.send(`Code: ${code}, For: ${reason}`);
        },
    },
});

console.log(`Server running at: ${server.url}`);
