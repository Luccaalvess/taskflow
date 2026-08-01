import express from "express";

const router = express.Router();

let projects = []
let nextId = 1;

router.get('/projects', (req, res) => {

    res.status(200).json(projects)
});

router.get('/projects/:id', (req, res) => {

    const id = Number(req.params.id);

    const project = projects.find(project => project.id === id);

    res.status(200).json(project);
})

router.post('/projects', (req, res) => {

    const project = {
        ...req.body,
        id: nextId
    }

    projects.push(project)
    console.log(projects)

    nextId++
    res.status(201).json({ message: "Projeto recebido com sucesso" })
})

router.put('/projects/:id', (req, res) => {

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

router.delete('/projects/:id', (req, res) => {

    const id = Number(req.params.id);

    projects = projects.filter(project => project.id !== id);

    res.status(200).json({ message: 'Projeto deletado com sucesso' });
})


export { router };

