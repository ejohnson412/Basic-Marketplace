// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const BasicMarketplace = await hre.ethers.getContractFactory("BasicMarketplace" );

    const basicmarketplace = await BasicMarketplace.deploy();

    await basicmarketplace.deployed();

    console.log("BasicMarketplace deployed to: " + basicmarketplace.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
});

  