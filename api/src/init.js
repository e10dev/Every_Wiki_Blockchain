import app from "./app.js";
import { logger } from './winston.js';
//import eosrpc from './eos/eosrpc.js';

const IP = process.env.SERVICE_IP;
const PORT = process.env.SERVICE_PORT;
const handleListening = () => logger.info(`✅Listening on: http://${IP}:${PORT}`);

//eosrpc.init();

app.listen(PORT, handleListening);
