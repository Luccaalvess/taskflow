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

    if(!project){
        return res.status(404).json({message: "Projeto não encontrado"});
    }

    res.status(200).json(project);
})

router.post('/projects', (req, res) => {
    
    if(!req.body.nome || !req.body.descricao){
        return res.status(400).json({message: "Nome e descrição são obrigatórios"})
    }

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

    const project = projects.find(project => project.id === id);

    if(!project){
        return res.status(404).json({message: "Projeto não encontrado"})
    }

    const updatedProject = {
        ...project,
        ...req.body
    }

    if(!updatedProject.nome || !updatedProject.descricao){
        return res.status(400).json({message: "Nome e descrição são obrigatórios"});
    }

    projects = projects.map(project => {
        return project.id === id ? updatedProject : project;
    })

    res.status(200).json({ message: 'Projeto atualizado com sucesso' })
})

router.delete('/projects/:id', (req, res) => {

    const id = Number(req.params.id);

    const projectExists = projects.some(project => project.id === id);
    
    if(!projectExists){
        return res.status(404).json({message: "Projeto não encontrado"});
    }
    
    projects = projects.filter(project => project.id !== id);

    res.status(200).json({ message: 'Projeto deletado com sucesso' });
});


export { router };

