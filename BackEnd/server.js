const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

alunos = [
  { id: 1, nome: "Renan", idade: 17 },
  { id: 2, nome: "Maik", idade: 18 },
];

app.get("/alunos", (req, res) => {
    res.send(alunos)
});

app.listen(port, () => {
    console.log(`Rodando na porta: http://localhost:${port}`)
});
