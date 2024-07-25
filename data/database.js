import mongoose from 'mongoose'

export const connenctDb = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: 'ApiBackEnd' })
    .then(() => {
      console.log('DataBase connected')
    })
    .catch((e) => console.log(e))
}
