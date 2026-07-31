import express from "express";
import cors from "cors";

// Criamos a aplicação.
const app = express();

// Middlewares
// Essa configuração faz com que o Express consiga interpretar requisições com corpo em JSON.
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {


    res.status(200).json({ message: "TaskFlow API" })

})


export { app };