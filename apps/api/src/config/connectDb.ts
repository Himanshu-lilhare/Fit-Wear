import mongoose from "mongoose"

export async function connectDb(){
    try {
          console.log('connectdb me a gaya')
        const {connection} = await mongoose.connect('mongodb+srv://rajlilhare200:ZpdfoCcRrl8QFhLO@cluster0.yy4j67p.mongodb.net/?retryWrites=true&w=majority')

        console.log(`server is connect with ${connection.port}`)
    } catch (error) {
        console.log('connect nahi hua')
    }
  
}