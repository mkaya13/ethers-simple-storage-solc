const { EtherscanProvider } = require("@ethersproject/providers");
const ethers = require("ethers");
const fs = require("fs-extra");

require("dotenv").config();

async function main() {
  // It's gonna return an encrypted json key that we can store locally and we can only decrypt it with the password

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  console.log(encryptedJsonKey);

  fs.writeFileSync("./.encrpytedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
