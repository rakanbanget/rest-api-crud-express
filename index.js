const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const response = require("./response")

app.use(bodyParser.json())
app.use(express.json());

let items = []

app.get("/task",  (req, res) => {
    response(200, items, "data siswa", res)
    
})


app.get("/task/:id", (req, res) => {
    const id = parseInt(req.params.id, 10)
    const item = items.find(i => i.id == id)
    if (item) {
        response(200, item, "Find nama lengkap", res)
    } else {
        res.status(404).send({ message: 'Item not found'})
    }
})

app.post("/task", (req, res) => {
    const item = req.body
    items.push(item)
    response(200, item, "Data Berhasil Di Tambahkan", res)
})

app.put("/task/:id", (req, res) => {
    const id = parseInt(req.params.id, 10)
    const index = items.findIndex(i => i.id === id)
    if (index !== -1) {
        items[index] = req.body
        response(200, items[index], "Data berhasil di ubah", res)
    } else {
        res.status(404).send({ message: 'Item not found'})
    }
})

app.delete('/task/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = items.findIndex(i => i.id === id)
    if (index !== -1) {
        const deletedItem = items.splice(index, 1)
        response(200, deletedItem, "Data Berhasil Di Hapus", res)
    } else {
        res.status(404).send({message: 'Item not found'})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})