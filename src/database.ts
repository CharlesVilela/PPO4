import mongoose from 'mongoose';

const URI = 'mongodb+srv://ppo:123@cluster0-vg64c.mongodb.net/test?retryWrites=true&w=majority';

async function connect (){

    try{
       await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database successfully connected!');
    }
    catch{
        console.log('Error connecting to the database!');
    }

}

export default connect;