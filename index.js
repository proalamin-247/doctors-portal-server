const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1d2zv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('doctors_portal').collection('services');
        const bookingCollection = client.db('doctors_portal').collection('bookings');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        /**
        * API Naming Convention
        * app.get('/booking') // get all booking in this collection. or get more than one or by filter
        * app.get('/booking')  // get a specific booking
        * app.post('/booking') // add a new booking
        * app.patch('/booking/:id') // 
        * app.delete('/booking/:id') // 
        */

        // add new bokking 
        app.post('/booking', async(req, res)=>{
            const booking= req.body;
            // const query= {treatment: booking.treatment, date: booking.date, patient: booking.patient};
            const result = bookingCollection.insertOne(booking);
            res.send(result);
        })


    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello doctors auncalll')
})

app.listen(port, () => {
    console.log(`Doctors app listening on port ${port}`)
})      