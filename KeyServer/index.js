var express = require("express"),
    mysql = require('mysql'),
    bodyParser = require("body-parser");

//Create express app
app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.set('json spaces', 40);

//create mySql connection
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});
connection.connect();



//key Generator function
const generate = () => {
    const character = "1234567890ABCDEFGHIJKLMNOPQRSVUSWXYZ";

    var myRandom = 0,
        myTextContent = "";
    for (i = 0; i < 20; i++) {
        myRandom = Math.floor(Math.random() * character.length);
        myTextContent += character[myRandom];
        if (((i + 1) % 5 == 0) && (i != 0) && (i + 1 != 20)) {
            myTextContent += "-"
        }
    }
    return (myTextContent);
}

// generating the requested keys and put them into an array  
const genKeys = (id_user) => {

    var arr = [];
    //get today's date
    const date = new Date();
    //YYYY-MM-DD format
    const mysqlDate = date.toISOString().split("T")[0];

    for (let i = 0; i < 10; i++) {
        var serial = generate();    // go to(generate function)
        arr.push([
            id_user,
            serial,
            mysqlDate
        ]);
    }
    return arr;
}


// Build response
const buildResponse = (keysArray, id) => {
    {
        let array = [];
        for (let i = 0; i < keysArray.length; i++) {
            array.push({
                id_key: id + i,  //add the Key id to the JSON array
                id_user: keysArray[i][0],
                serial: keysArray[i][1],
                key_date: keysArray[i][2]
            });                                 
        }
        return array;
    };
}

//Post request , render a json array of generated keys
app.post("/key/create", async (req, res) => {

    if (req.body.name === '' )
        res.json({ created: false });
    else {
        var name = req.body.name;
        var id_user;
        await connection.query("select * from usersTable where name = ?", name, (err, result) => { // testing if the name exist before
            if (err) throw err;
            id_user = result[0];
            if (id_user === undefined) {   //if the user do not exist

                connection.query("insert into usersTable(name) values('" + name + "')", (err, result) => {
                    if (err) throw err;

                    //Save the keys to the database
                    var keysArray = genKeys(result.insertId); //got to genkeys function 
                    const query = "insert into keysTable(id_user, serial, key_date) values ?";

                    connection.query(query, [keysArray], (err, result) => { // insert the keys array to the database
                        if (err) throw err;
                        var array = buildResponse(keysArray, result.insertId);  // return the keys list                     
                        res.json(array);    // send the list of keys within the response 
                    });
                });
            } else {
                //Save the keys to the database
                var keysArray = genKeys(id_user.id_user);
                const query = "insert into keysTable(id_user, serial, key_date) values ?";

                connection.query(query, [keysArray], (err, result) => {
                    if (err) throw err;
                    var array = buildResponse(keysArray, result.insertId);   // return the keys list
                    res.json(array);    // send the list of keys within the response 
                });
            }
        });
    }
});



// Delete request , render a json response of generated keys
app.post("/delete", (req, res)=>{
	const id_key = req.body.id_key; 
	const query = "delete from keysTable where id_key = ?";
	connection.query(query, id_key, (err)=>{            // delete query 
		if(err) {                       
			res.json({
				deleted: false                  
			});
		}
		else{
			res.json({
				deleted: true
			});
		}
	});
});



app.listen(3000, function () {      
    console.log("server started");
});

