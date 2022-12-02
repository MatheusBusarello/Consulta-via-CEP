const express = require("express")
const path = require("path")
const fs = require("fs")
var bodyParser = require("body-parser")
const app = express()

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const diretorio = "./data/cliente.json"

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"))
})

app.get('/cliente', async (req, res) => {
  try {
    const data = await fs.readFileSync(diretorio, "utf-8")
    res.send(data)
  } catch (error) {
    res.send("Erro enquanto lendo o arquivo")
  }
})

app.post("/cliente", async (req, res) => {
  try {
    const data = await fs.readFileSync(diretorio, "utf-8")
    const novoCliente = req.body
    const clientes = JSON.parse(data).clientes
    const clientesAtualizados = [novoCliente, ...clientes]
    await fs.writeFileSync(diretorio, JSON.stringify(clientesAtualizados), "utf-8")
    res.send(clientesAtualizados)
  } catch (erro) {
    console.log(erro)
    res.send("Erro enquanto salvando cliente")
  }
})
app.listen(3000)