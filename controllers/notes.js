const { json } = require("express");
const client = require("../config/DB");

exports.addNote = (req, res) => {
    const { heading, content } = req.body;
    // console.log(req);
    // console.log(req.email);
    // console.log(heading)
    // console.log(content)

    client.query(`INSERT INTO notes (email,heading, content) VALUES('${req.email}', '${heading}','${content}'); `)
        .then((data) => {
            res.status(200).json({
                message: "Note added succuessfully!",

            });
        })
        .catch(err => {
            res.status(500).json({
                bhai: "jabardast",
                message: "Database error occured"
            })
        })
}

exports.getAllNotes = (req, res) => {
    client.query(`SELECT * FROM notes WHERE email = '${req.email}'; `)
        .then((data) => {
            // console.log(data)
            const noteData = data.rows;
            const filteredData = noteData.map((note) => {
                return {
                    noteID: note.noteid,
                    heading: note.heading,
                    content: note.content
                }
            })
            console.log(filteredData);
            res.status(200).json({
                Message: "DATA EXTRACTED SUCCESSFULLY!",
                Data: filteredData
            });
        })
        .catch(err => {
            res.status(500).json({
                bhai: "jabardast",
                message: "Database error occured"
            })
        })

}

exports.updateNote = (req, res) => {
    console.log(req.params.noteID);
    noteID = req.params.noteID;
    const { heading, content } = req.body;
    client.query(`UPDATE notes SET heading='${heading}',content ='${content}' WHERE notedid='${noteID}';`)
        .then((data) => {
            res.status(200).json({
                message: "Mitroooo....notes updated successfulyyy"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Database error occured"
            })
        })

}
exports.deleteNote = (req, res) => {
    console.log(req.params.noteID);
    noteID = req.params.noteID;
    // const { heading, content } = req.body;
    client.query(`DELETE FROM notes WHERE notedid='${noteID}';`)
        .then((data) => {
            res.status(200).json({
                message: "Mitroooo....note deleted successfulyyy"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Database error occured"
            })
        })

}