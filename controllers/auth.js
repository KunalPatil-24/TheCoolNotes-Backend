const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


let tempDB = [
    {
        "name": "kunal",
        "email": "kunal@gmail.com",
        "password": "abcdKunal"
    },
    {
        "name": "Om",
        "email": "Om@gmail.com",
        "password": "abcdOm"
    },
    {
        "name": "Yash",
        "email": "Yash@gmail.com",
        "password": "abcdYash"
    }

]


exports.signUp = (req, res) => {

    const { name, email, password } = req.body;

    console.log(`${name} ${email} ${password}`)

    //NOTE1:  CHECK IF THE USER IS ALREADY IN THE DATABASE OR NOT
    const isValid = tempDB.findIndex((elem) => elem.email === email);

    if (isValid !== -1) {
        res.status(400).json({
            error: "user already exists, please signIn "
        })
    }

    //NOTE2:  GENERATE TOKEN
    const token = jwt.sign({
        email: email,

    },
        process.env.SECRET_KEY
    )


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
        tempDB.push(newUser);
        console.log(tempDB)
        res.status(200).json({
            message: "User signed Up successfuly",
            token: token
        })

    })



}

exports.signIn = (req, res) => {
    res.send("yepp, signed In")
}