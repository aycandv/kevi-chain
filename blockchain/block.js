const SHA256 = require("crypto-js/sha256");
const { DIFFICULTY, MINE_RATE } = require("../config");

class Block {

    constructor(timestamp, previousHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block -
        Timestamp     : ${this.timestamp}
        Previous Hash : ${this.previousHash.substring(0,10)}
        Hash          : ${this.hash.substring(0,10)}
        Nonce         : ${this.nonce}
        Difficulty    : ${this.difficulty}
        Data          : ${this.data}`;
    }

    static genesis() {
        return new this("Genesis time", "0", "d312-wr59s", [], 0, DIFFICULTY)
    }

    static mineBlock(previousBlock, data) {
        let hash, timestamp;
        const previousHash = previousBlock.hash;
        let {difficulty} = previousBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(previousBlock, timestamp);
            hash = Block.hash(timestamp, previousHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, previousHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, previousHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${previousHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const {timestamp, previousHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp, previousHash, data, nonce, difficulty);
    }

    static adjustDifficulty(previousBlock, currentTime) {
        let { difficulty } = previousBlock;
        difficulty = previousBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }

}

module.exports = Block;