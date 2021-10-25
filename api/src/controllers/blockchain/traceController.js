import request from "../request.js";
import { logger } from '../../winston.js';
import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig.js';  // development only
import fetch from 'node-fetch'; //node only
import { TextDecoder, TextEncoder } from 'util'; //node only

let rpc;
let api;

const privateKeys = ['5HzFwkbV1NynFmvrrTztPAmmr7PfK9fFspnBHaeuR4R3hhjkB5Z','5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'];
const signatureProvider = new JsSignatureProvider(privateKeys);
rpc = new JsonRpc('http://127.0.0.1:8888', { fetch }); //required to read blockchain state
api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions

export const writebody = async (req, res) => {   
    const n = req.body.name;
    const i = req.body.id;
    const t = req.body.text;
    try
    {
        await api.transact({
        actions: [{
            account: 'wiki',
            name: 'writebody',
            authorization: [{
                actor: 'wiki',
                permission: 'active',
            }],
            data: {
                wiki: n,
                id: i,
                msg: t,
            },
            }]
        },
        {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        res.send( 'ok' );
    }
    catch (error)
    {
        console.log(error);
        res.send('error');
    }
};

export const readbody = async (req, res) => {
    const result = await rpc.get_table_rows({
        json: true,               // Get the response as json
        code: 'wiki',      // Contract that we target
        scope: 'wiki',         // Account that owns the data
        table: 'wikibody',        // Table name
        limit: 10,                // Maximum number of rows that we want to get
        reverse: false,           // Optional: Get reversed data
        show_payer: false          // Optional: Show ram payer
    });

    res.send( result );
};

export const updatebody = async (req, res) => {   

};

export const deletebody = async (req, res) => {   

};
