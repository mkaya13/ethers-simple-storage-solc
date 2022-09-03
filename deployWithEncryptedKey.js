const ethers = require("ethers")
const fs = require("fs-extra")

require("dotenv").config()

async function main() {
  // compile them in our code
  // compile them separately
  // http://172.30.208.1:7545

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  )
  wallet = await wallet.connect(provider)

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  )

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("Deploying the contract please wait...")

  // Reason for await => Stop here! Wait for our contract to be deployed! await keyword will resolve the promise !!
  const contract = await contractFactory.deploy() // This will return a contract object // Inside deploy we can add {gasLimit, gasPrice}
  console.log(contract)

  const transactionReceipt = await contract.deployTransaction.wait(1)

  console.log("Here is the deployment transaction: (txn response) ") // What you get when you create your txn
  console.log(contract.deployTransaction)

  console.log("Here is the transaction receipt: ") // What you get when you wait for a blockc confirmation
  console.log(transactionReceipt)

  // Interacting with Contracts in ethers.js
  console.log("Interacting with the deployed contract:")

  const currentFavoriteNumber = await contract.retrieve()
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`) // toString()

  console.log("Use store function in the contract: ")
  const transactionStoreResponse = await contract.store("7")
  const transactionStoreReceipt = await transactionStoreResponse.wait("1")

  const updatedFavNumber = await contract.retrieve()
  console.log(`Updated Favorite Number: ${updatedFavNumber.toString()}`) // toString()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
