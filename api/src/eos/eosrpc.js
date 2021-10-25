'use strict';

import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig.js';  // development only
import fetch from 'node-fetch'; //node only
import { TextDecoder, TextEncoder } from 'util'; //node only
import { logger } from '../winston.js';

let rpc;
let api;

class Eosrpc {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        const privateKeys = ['5HzFwkbV1NynFmvrrTztPAmmr7PfK9fFspnBHaeuR4R3hhjkB5Z'];
        const signatureProvider = new JsSignatureProvider(privateKeys);
        rpc = new JsonRpc('http://127.0.0.1:8888', { fetch }); //required to read blockchain state
        api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions
    }

    readbody()
    {
         (async () => {
            const result = await rpc.get_table_rows({
              json: true,               // Get the response as json
              code: 'wiki',      // Contract that we target
              scope: 'wiki',         // Account that owns the data
              table: 'wikibody',        // Table name
              limit: 10,                // Maximum number of rows that we want to get
              reverse: false,           // Optional: Get reversed data
              show_payer: false          // Optional: Show ram payer
            });

            return result.rows;
          })();
    }

}

export default new Eosrpc();
