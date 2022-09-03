// let -- var -- const
// synchronous [solidity] => means just goes one line after another (there will be some exceptions when we use oracles)

// Synchronous
// 1. Put popcorn in microwave -> Promise
// 2. Wait for popcorn to finish
// 3. Place salt for popcorn

// Asynchronous
// 1. Put popcorn in microwave
// 1. At the same time, pour drinks to everyone
// 2. Wait for popcorn to finish

// Promise can be :
// Pending
// Fullfilled
// Rejected

let writer = () => {
  console.log("Hi Man!")
}

writer()

let setupMovieNight = async () => {
  await cookPopcorn()
  await fonker()
  asdfas
  await pourDrinks()
  console.log("Ok now we can start the movie!")
}

function cookPopcorn() {
  return console.log("1")
}

function pourDrinks() {
  return console.log("2")
}

setupMovieNight()

let fonker = () => {
  let x = 5
  x++
  console.log(x)
}

// fonker();

setupMovieNight()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
