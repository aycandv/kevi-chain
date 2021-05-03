const Block = require("./block");

const genesis = Block.genesis();
const fooBlock = Block.mineBlock(genesis, "foo")

console.log(fooBlock.toString());
