const express = require('express')
const path = require("path");

const app = express()

const database = require('./database/database.js')

app.use(express.json())

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/galeira", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/galeria.html"));
});

app.get("/diferenciais", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/diferenciais.html"));
});

app.get("/pacotes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/pacotes.html"));
});

app.get("/sobre", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/sobre.html"));
});

app.get("/api/cadastro", (req, res) => {
    database.all("SELECT * FROM cadastro", (err, rows) => {
        if(err) {
            res.status(500).json({mensagem: 'Erro ao fazer requisição'})
            return
        }
        res.status(200).json(rows)
    })
})

app.post("/api/cadastro", (req, res) => {

    const {nome, email, destino} = req.body;
    
    database.run("INSERT INTO cadastro (nome, email, destino) VALUES (?, ?, ?)",
    [nome, email, destino],
    function (err) {
        if(err) {
            console.log(err)
            res.status(400).json({mensagem: "Erro ao fazer requisição", error: err})
            return
        }

        const newCadastro = this.lastID
        res.status(200).json({mensagem: newCadastro})
    })
})

app.delete("/api/cadastro/:id", (req, res) => {

    const {id} = req.params;
    
    database.run("DELETE FROM cadastro WHERE ID = ?",
    [id],
    function (err) {
        if(err) {
            res.status(400).json({mensagem: "Erro ao fazer requisição"})
            return
        }
        res.status(200).json({mensagem: "Item excluido"})
    })
})


app.listen(3000, () => {
    console.log(`Servidor rodando em  http://localhost:${3000}`);
  });
