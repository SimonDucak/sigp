import { Emit } from 'shared-resources';
import { User } from 'shared-resources/User';
import socket from '@/socket';

export default () => {
  const emitJoinUser = (user: User): void => {
    socket.emit(Emit.JOIN, user);
  };

  const emitCanvasData = (canvasData: string): void => {
    socket.emit(Emit.CANVAS_DATA, canvasData);
  };

  const emitLogout = (): void => {
    socket.emit(Emit.LOG_OUT);
  };

  const onAlert = (handler: (alertMessage: string) => void) => {
    socket.on(Emit.ALERT, handler);
  };

  const onGetUsers = (handler: (users: User[]) => void) => {
    socket.on(Emit.GET_USERS, handler)
  };

  const onUserJoined = (handler: (user: User) => void) => {
    socket.on(Emit.JOINED, handler);
  };

  const onGetCurrentUserID = (handler: (id: string) => void) => {
    socket.on(Emit.GET_CURRENT_USER_ID, handler);
  };

  const onCanvasData = (handler: (canvasData: string) => void) => {
    socket.on(Emit.CANVAS_DATA, handler);
  };

  return {
    emitJoinUser,
    onAlert,
    onGetUsers,
    onUserJoined,
    onGetCurrentUserID,
    emitCanvasData,
    onCanvasData,
    emitLogout,
  };
};
