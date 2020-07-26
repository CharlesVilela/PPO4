import mongoose from 'mongoose';

const URI = 'mongodb+srv://ppo:123@cluster0.d8jul.mongodb.net/ppo?retryWrites=true&w=majority';

async function connect (){

    try{
       await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Database successfully connected!');
    }
    catch{
        console.log('Error connecting to the database!');
    }

}

export default connect;