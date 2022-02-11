const express = require('express');
const BlockChain = require('./blockchain');
const uuid = require('uuid');
const port = process.argv[2];
const currentNodeUrl = process.argv[3];

const nodeAddress = 'HAO'+uuid.v4().split('-').join('').toUpperCase();
const bitcoin = new BlockChain(currentNodeUrl);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/blockchain', function (req, res) {
    res.json(bitcoin);
});

app.post('/transaction', function (req, res) {
    const { amount, sender, recipient } = req.body;
    const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient);
    res.json({ blockIndex });
});

app.get('/mine', function (req, res) {
    // Do the Proof of work
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock.hash;
    const currentBlockData = {
        index: lastBlock.index + 1,
        transactions: bitcoin.pendingTransactions
    }
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const hash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    // Create new block
    console.log('Mine', hash)
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hash);
    // Reward to miner
    bitcoin.createNewTransaction(12.5, '00', nodeAddress);
    res.json(newBlock);
});

app.post('/register-and-broadcast-node', function (req, res) {
    
});

app.post('/register-node', function (req, res) {
    
});

app.post('/register-nodes-bulk', function (req, res) {
    
});

app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
});