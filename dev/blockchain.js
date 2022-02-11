const sha256 = require("sha256");

function BlockChain(currentNodeUrl) {
    this.chains = [];
    this.pendingTransactions = [];
    this.currentNodeUrl = currentNodeUrl;
    this.createNewBlock(100, '0', '0');
}

BlockChain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chains.length + 1,
        timestamp: new Date(),
        transactions: this.pendingTransactions,
        nonce,
        hash,
        previousBlockHash
    }
    this.pendingTransactions = [];
    this.chains.push(newBlock);
    return newBlock;
}

BlockChain.prototype.getLastBlock = function () {
    return this.chains[this.chains.length - 1];
}

BlockChain.prototype.createNewTransaction = function (amount, sender, recipient) {
    const newTransaction = {
        amount, sender, recipient
    }
    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock()['index'] + 1;
}

BlockChain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    const sha256AsString = previousBlockHash + nonce + JSON.stringify(currentBlockData);
    return sha256(sha256AsString);
}

BlockChain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
    let nonce = -1;
    let hash = '';
    do {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    } while (hash.substring(0,4) !== '0000');
    console.log('Proof of work', hash);
    return nonce;
}

module.exports = BlockChain;

