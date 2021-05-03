const SHA256 = require("crypto-js/sha256")

class Block {

    constructor(timestamp, previousHash, hash, data) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block -
        Timestamp     : ${this.timestamp}
        Previous Hash : ${this.previousHash.substring(0,10)}
        Hash          : ${this.hash.substring(0,10)}
        Data          : ${this.data}`;
    }

    static genesis() {
        return new this("Genesis time", "0", "d312-wr59s", [])
    }

    static mineBlock(previousBlock, data) {
        const timestamp = Date.now();
        const previousHash = previousBlock.hash;
        const hash = Block.hash(timestamp, previousHash, data);

        return new this(timestamp, previousHash, hash, data);
    }

    static hash(timestamp, previousHash, data) {
        return SHA256(`${timestamp}${previousHash}${data}`).toString();
    }

}

module.exports = Block;