const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

const PORT = 5000;
const ARQUIVO = __dirname + "/dados.json";

app.use(cors());
app.use(express.json());

// 🔹 Carregar dados do arquivo
const carregar = () => {
  if (!fs.existsSync(ARQUIVO)) {
    fs.writeFileSync(ARQUIVO, JSON.stringify({}));
  }
  return JSON.parse(fs.readFileSync(ARQUIVO));
};

// 🔹 Salvar dados no arquivo
const salvar = (dados) => {
  fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
};

// GET → buscar escala
app.get("/dados", (req, res) => {
  res.json(carregar());
});

// POST → salvar escala
app.post("/dados", (req, res) => {
  salvar(req.body);
  res.json({ sucesso: true });
});

// DELETE → limpar escala
app.delete("/dados", (req, res) => {
  salvar({});
  res.json({ sucesso: true });
});

app.listen(PORT, () => console.log(`✅ Backend rodando em http://localhost:${PORT}`));
