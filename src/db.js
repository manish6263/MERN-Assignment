const mongoose = require('mongoose');

// console.log(process.env.ONLINE_DATABASE_URL, process.env.OFFLINE_DATABASE_URL);

//online connection.......
mongoose.connect(process.env.ONLINE_DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log('Online connection successfull.......'))
    .catch((error) => {
        console.log(error);

        //for offline connection.........
        mongoose.connect(process.env.OFFLINE_DATABASE_URL)
            .then(() => console.log('Offline connection sucessfull.....'))
            .catch((error) => console.log(error))
    });