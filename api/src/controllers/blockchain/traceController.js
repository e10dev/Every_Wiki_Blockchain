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
rpc = new JsonRpc('http://192.168.16.24:8888', { fetch }); //required to read blockchain state
api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions

export const writeBlock = async (req, res) => {   
    const a = req.body.articleId;
    const u = req.body.username;
    const t = req.body.title;
    const w = req.body.wikitext;
    try
    {
        await api.transact({
        actions: [{
            account: 'wiki',
            name: 'writeblock',
            authorization: [{
                actor: 'wiki',
                permission: 'active',
            }],
            data: {
                wiki: "wiki",
                articleId: a,
                username: u,
                title: t,
                wikitext: w,
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

export const readBlock = async (req, res) => {
    console.log(req.query.articleId)
    const result = await rpc.get_table_rows({
        json: true,               // Get the response as json
        code: 'wiki',             // Contract that we target
        scope: 'wiki',            // Account that owns the data
        table: 'wikiblock',        // Table name
        lower_bound: req.query.articleId,
        limit: 1,                 // Maximum number of rows that we want to get
        reverse: false,           // Optional: Get reversed data
        show_payer: false         // Optional: Show ram payer
    });
    await console.log(result)

    res.send( result );
};

export const updateTitle = async (req, res) => {   
    const a = req.body.articleId;
    const u = req.body.username;
    const t = req.body.title;
    try
    {
        await api.transact({
        actions: [{
            account: 'wiki',
            name: 'updatetitle',
            authorization: [{
                actor: 'wiki',
                permission: 'active',
            }],
            data: {
                wiki: "wiki",
                username: u,
                articleId: a,
                title: t,
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

export const updateArticle = async (req, res) => {   
    const a = req.body.articleId;
    const u = req.body.username;
    const w = req.body.wikitext;
    try
    {
        await api.transact({
        actions: [{
            account: 'wiki',
            name: 'updatearticle',
            authorization: [{
                actor: 'wiki',
                permission: 'active',
            }],
            data: {
                wiki: "wiki",
                username: u,
                articleId: a,
                title: w,
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

export const deleteBlock = async (req, res) => {
    const a = req.body.articleId;
    try
    {
        await api.transact({
        actions: [{
            account: 'wiki',
            name: 'deleteblock',
            authorization: [{
                actor: 'wiki',
                permission: 'active',
            }],
            data: {
                wiki: "wiki",
                articleId: a,
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
