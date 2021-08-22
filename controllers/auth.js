const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../config/DB");


exports.signUp = (req, res) => {

    const { name, email, password } = req.body;

    // console.log(`${name} ${email} ${password}`)


    //NOTE1:  CHECK IF THE USER IS ALREADY IN THE DATABASE OR NOT

    client.query(`SELECT * FROM users WHERE email = '${email}' ;`)
        .then((data) => {
            isValid = data.rows;
            // console.log(data);
            if (isValid.length !== 0) {
                res.status(400).json({
                    error: "user already exists, please signIn "
                })
            }

            else {

                //NOTE3:  IF USER IS NEW, HASH HIS PASSWORD
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: "Internal Server error"
                        });
                    }
                    const newUser = {
                        name,
                        email,
                        password: hash
                    }

                    client.query(`INSERT INTO users (name,email,password) VALUES ( '${name}' , '${email}', '${hash}');`)
                        .then((data) => {
                            // console.log("************************")
                            // console.log(data);
                            // console.log("************************")
                            //NOTE2:  GENERATE TOKEN
                            const token = jwt.sign({
                                email: email,

                            },
                                process.env.SECRET_KEY
                            );
                            res.status(200).json({
                                message: "User added successfuly to the database",
                                token: token
                            })
                        })
                        .catch((err) => {
                            res.send(500).json({
                                error: `Database error occured and it is ${err}`,
                            })
                        });



                })
            }
        })
        .catch((err) => {
            res.send(500).json({
                error: `Database error occured and it is ${err}`,
            })
        })

}


exports.signIn = (req, res) => {

    const { email, password } = req.body;
    // console.log(` ${email} ${password}`)

    client.query(`SELECT * FROM users WHERE email = '${email}' ;`)
        .then((data) => {
            // console.log(data.rows)
            isValid = data.rows
            if (isValid.length === 0) {
                res.send("User does not exist, please sign up first");
            }
            else {
                bcrypt.compare(password, data.rows[0].password, function (err, result) {
                    if (err) {
                        res.status(500).json({
                            error: err,
                            reason: "server error occured"
                        })
                    }
                    else if (result === true) {
                        // console.log(result);
                        // console.log(password);
                        // console.log(data.rows[0].password);
                        const token = jwt.sign({
                            email: email,

                        },
                            process.env.SECRET_KEY
                        );
                        res.status(200).json({
                            message: "User can sign in successfuly",
                            token: token
                        })
                    }
                    else {
                        res.status(400).json({
                            error: 'Wrong Password',
                        })

                    }
                });
            }
        })
        .catch(err => {
            res.send(500).json({
                error: `Database error occured and it is ${err}`,
            })
        })

}