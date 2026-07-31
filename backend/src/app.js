import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let projects = []
let nextId = 1;

app.get('/projects', (req, res) => {

    res.status(200).json(projects)
})


app.get('/projects/:id', (req, res) => {

    const id = Number(req.params.id);

    const project = projects.find(project => project.id === id);

    res.status(200).json(project);
})


app.post('/projects', (req, res) => {

    const project = {
        ...req.body,
        id: nextId
    }

    projects.push(project)
    console.log(projects)

    nextId++
    res.status(201).json({ message: "Projeto recebido com sucesso" })
})

app.put('/projects/:id', (req, res) => {

    const id = Number(req.params.id);

    projects = projects.map(project => {
        if (project.id === id) {
            project = {
                ...project,
                ...req.body,
                // nome: req.body.nome,
                // descricao: req.body.descricao
            }
            return project
        }
        return project
    })

    res.status(200).json({ message: 'Projeto atualizado com sucesso' })
})



app.delete('/projects/:id', (req, res) => {

    const id = Number(req.params.id);

    projects = projects.filter(project => project.id !== id);

    res.status(200).json({ message: 'Projeto deletado com sucesso' });
})

export { app };