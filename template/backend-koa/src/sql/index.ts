import mongoose from "mongoose"

// @ts-ignore
const CONNECTION = mongoose.connect(process.env.DDTABASE_LOCAL)
  .then(() => {
    console.log('✔ : sql connect successful');
  })
  .catch((err) => {
    console.log(err, '❌ : DB connect ERROR!');
  });

export default CONNECTION
