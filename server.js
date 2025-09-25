const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000; // usar porta do Railway
const ARQUIVO = "./dados.json";

app.use(cors());
app.use(bodyParser.json());

// 🔹 Carregar dados do arquivo JSON
const carregarDados = () => {
  if (!fs.existsSync(ARQUIVO)) {
    fs.writeFileSync(ARQUIVO, JSON.stringify({}));
  }
  return JSON.parse(fs.readFileSync(ARQUIVO));
};

// 🔹 Salvar dados no arquivo JSON
const salvarDados = (dados) => {
  fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
};

// ✅ Rota GET → pega todos os dados
app.get("/dados", (req, res) => {
  const dados = carregarDados();
  res.json(dados);
});

// ✅ Rota POST → sobrescreve os dados
app.post("/dados", (req, res) => {
  const dados = req.body;
  salvarDados(dados);
  res.json({ sucesso: true, dados });
});

// ✅ Rota DELETE → limpa tudo
app.delete("/dados", (req, res) => {
  salvarDados({});
  res.json({ sucesso: true, mensagem: "Escala apagada com sucesso!" });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
