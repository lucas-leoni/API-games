const { request, response } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const DB = {
  games: [
    {
      id: 100,
      name: "Diablo",
      year: 1994,
      price: 120,
    },
    {
      id: 101,
      name: "Final Fantasy",
      year: 1996,
      price: 100,
    },
    {
      id: 102,
      name: "Counter Strike",
      year: 2000,
      price: 190,
    },
  ],
};

// criando uma rota que retorne todos os jogos
app.get("/api/games", (request, response) => {
  response.send(DB.games);
});

// criando uma rota que retorna um jogo por id
app.get("/api/game/:id", (req, res) => {
  const idUser = req.params.id;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const game = DB.games.find((index) => index.id === id);
    if (game !== undefined) {
      res.statusCode = 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  }
});

// deletar um jogo a partir de um id associado
app.delete("/api/game/:id", (req, res) => {
  const idUser = req.params.id;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const game = DB.games.findIndex((index) => index.id === id);
    if (game === -1) {
      // usuário informou um id que não existe na base
      res.sendStatus(404);
    } else {
      DB.games.splice(game, 1);
      res.statusCode = 200;
      res.json({ message: "Uhull, jogo removido com sucesso!" });
    }
  }
});

// criando um novo jogo
app.post("/api/game", (req, res) => {
  const { name, year, price } = req.body;
  DB.games.push({
    id: Math.floor(Math.random() * 10 + 1),
    name,
    year,
    price,
  });
  res.send({ message: "Uhuul, novo jogo criado com sucesso!" });
});

// iniciando nosso app na porta 3000
app.listen(3000, () => {
  console.log("API RUNNING, http://localhost:3000");
});
