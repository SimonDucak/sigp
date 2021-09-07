import * as express from "express";
import { Socket } from "socket.io";
import { EXPRESS_PORT, VUE_PORT, Emit } from "./shared-resources";
import { User } from "./shared-resources/User";
import { userJoin, getUsers, removeUser, getCurrentUser } from "./data/users";

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
   cors: {
      origin: `http://localhost:${VUE_PORT}`,
      methods: ["GET", "POST"]
   }
});

io.on("connection", (socket: Socket) => {
    socket.on(Emit.JOIN, (user: User) => {
        const newUser = userJoin(user, socket.id);
        io.emit(Emit.JOINED, newUser);
        socket.emit(Emit.GET_CURRENT_USER_ID, newUser.id);
        socket.broadcast.emit(Emit.ALERT, `${newUser.username} has joined the app.`);
    });

    socket.emit(Emit.GET_USERS, getUsers());

    const onLeaveOrLogout = () => {
        const user: User | undefined = getCurrentUser(socket.id);
        if (user) {
            removeUser(user.id);
            socket.broadcast.emit(Emit.GET_USERS, getUsers());
            socket.broadcast.emit(Emit.ALERT, `${user.username} has left the app.`);
        }
    };

    socket.on('disconnect', () => {
        onLeaveOrLogout();
    });

    socket.on(Emit.LOG_OUT, () => {
        onLeaveOrLogout();
    });

    socket.on(Emit.CANVAS_DATA, (data: string) => {
        socket.broadcast.emit(Emit.CANVAS_DATA, data);
    });
});

http.listen(EXPRESS_PORT, () => console.log(`Listening at at port ${EXPRESS_PORT}`));
