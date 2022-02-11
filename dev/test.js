const BlockChain = require('./blockchain');

const bitcoin = new BlockChain();

// // The very first block - no transaction
// bitcoin.createNewBlock(000000, null, 'FIRST-block-hash');

// // The second block - 3 transactions
// bitcoin.createNewTransaction(100, 'HAO-sender', 'CHAU-recipient');
// bitcoin.createNewTransaction(200, 'CHAU-sender', 'HAO-recipient');
// bitcoin.createNewTransaction(300, 'MINH-sender', 'HAO-recipient');
// bitcoin.createNewBlock(000001, 'FIRST-block-hash', 'SECOND-block-hash');

// // The 3rd block - 5 transactions
// bitcoin.createNewTransaction(50, 'TEST-1', 'TEST-2');
// bitcoin.createNewTransaction(60, 'TEST-3', 'TEST-4');
// bitcoin.createNewTransaction(90, 'TEST-4', 'TEST-5');
// bitcoin.createNewTransaction(930, 'TEST-8', 'TEST-9');
// bitcoin.createNewTransaction(920, 'TEST-7', 'TEST-10');
// bitcoin.createNewBlock(000002, 'SECOND-block-hash', '3RD-block-hash');


// console.log(JSON.stringify(bitcoin, null, 2));

const previousBlockHash = 'HAOAISUDFLAJSKLDFJLAKSDJF';
const currentBlockData = [
    {
        amount: 100,
        sender: 'HAO-ADDRESS',
        recipient: 'CHAU-ADDRESS'
    },
    {
        amount: 120,
        sender: 'HAO-ADDRESS1',
        recipient: 'CHAU-ADDRESS1'
    },
    {
        amount: 150,
        sender: 'HAO-ADDRESS2',
        recipient: 'CHAU-ADDRESS3'
    },
]


const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
console.log(nonce);
