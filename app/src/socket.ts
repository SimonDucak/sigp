import { EXPRESS_PORT } from "shared-resources";
import io from "socket.io-client";

const URL = process.env.NODE_ENV === 'production' ? window.location.origin : `http://localhost:${EXPRESS_PORT}`;
export default io(URL);
