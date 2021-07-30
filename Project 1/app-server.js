var express = require('express');
var mongodb = require('mongodb');
const SERVER_PORT = 8106;

//#############################################
// ID, password, databse, and ports
var user = 'z_liu';
var password = 'A00444781';
var database = 'z_liu';
//#############################################

var host = '127.0.0.1';
var port = '27017'; // Default MongoDB port for all the students


// Now create a connection String to be used for the mongo access
var connectionString = 'mongodb://' + user + ':' + password + '@' +
host + ':' + port + '/' + database;
console.log(connectionString);



//CORS Middleware, causes Express to allow Cross-Origin Requests
// Do NOT change anything here
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
};


//set up the server variables
var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use(express.static(__dirname));


//now start the application server
//#############################################
//the var for the rectangle collections
var universityCollection;
const NAME_OF_COLLECTION = 'universities';
//#############################################

//now connect to the db
mongodb.connect(connectionString, function (error, db) {
    
    if (error) {
        throw error;
    }//end if

    universityCollection = db.collection(NAME_OF_COLLECTION);

    // Close the database connection and server when the application ends
    process.on('SIGTERM', function () {
        console.log("Shutting server down.");
        db.close();
        app.close();
    });

 //now start the application server
 var server = app.listen(SERVER_PORT, function () {
    console.log('Listening on port %d',
        server.address().port);
});
});

app.post('/addUniversity', function (request, response) {

    //console.log("Process being executed in " + __dirname);
    console.log("saveUniversity being executed in " + __dirname);
    console.log(request.body);


    //extract the data
    var name = request.body.Name;
    var address = request.body.Address;
    var phone = parseFloat(request.body.PhoneNumber);


    console.log('Name : ' + name);
    console.log('Address : ' + address);
    console.log('Phone : ' + phone);


    universityCollection.insert(request.body,
        function (err, result) {
         if (err) {
             return response.send(400,'An error occurred saving a record.');
           }//end if

           return response.send(200, "Record inserted successfully.");
       });


});

app.post('/deleteUniversity', function (request, response) {

    //console.log("Process being executed in " + __dirname);
    console.log("saveUniversity being executed in " + __dirname);
    console.log(request.body);


    //extract the data
    var name = request.body.Name;


    console.log('Name : ' + name);


    universityCollection.remove(request.body,
        function (err, result) {
         if (err) {
             return response.send(400,'An error occurred saving a record.');
           }//end if

           return response.send(200, "Record deleted successfully.");
       });

});

app.post('/getUniversity', function (request, response) {


    console.log("getUniversity being executed in " + __dirname);
    console.log(request.body);


    //extract the data
    var name = request.body.Name;



    console.log('Name : ' + name);


    universityCollection.find(request.body,
        function (err, result) {
         if (err) {
             return response.send(400,'An error occurred saving a record.');
           }//end if
                      //now result is expected to be an array of rectangles
                      result.toArray(
                        function (err, resultArray) {
                            if (err) {
                                return response.send(400, 'An error occurred processing your records.');
                    }//end if

            //if succeeded, send it back to the calling thread
            console.log(resultArray);
            return response.send(200, resultArray);
        });

                  });

});


app.post('/allUniversities', function (request, response) {

    //console.log("Process being executed in " + __dirname);
    console.log("getUniversity being executed in " + __dirname);
    console.log(request.body);



    universityCollection.find(
        function (err, result) {
         if (err) {
             return response.send(400,'An error occurred saving a record.');
           }//end if
                      //now result is expected to be an array of rectangles
                      result.toArray(
                        function (err, resultArray) {
                            if (err) {
                                return response.send(400, 'An error occurred processing your records.');
                    }//end if

            //if succeeded, send it back to the calling thread
            console.log(resultArray);
            return response.send(200, resultArray);
        });

                  });

});


