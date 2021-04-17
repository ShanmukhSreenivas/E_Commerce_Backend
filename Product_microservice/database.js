const mongoose = require("mongoose");

var uri = "mongodb+srv://dbUser:atlaspassword@cluster0.bghub.mongodb.net/Product_microservice?retryWrites=true&w=majority";

const options = {
    useNewUrlParser:  true,
    useFindAndModify: false,
    useUnifiedTopology:  true,
};

mongoose.connect(uri, options).then(() => {
    console.log("Connection established to the Database");
}, 
err => {
    {
        console.log("Error connecting database : ", err);
    }
});
