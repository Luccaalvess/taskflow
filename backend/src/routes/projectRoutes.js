import express from "express";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

let projects = []
let nextId = 1;

router.get('/projects', async (req, res) => {

    const projects = await prisma.projects.findMany();

    res.status(200).json(projects);
});

router.get('/projects/:id', async (req, res) => {

    const id = Number(req.params.id);

    // const project = projects.find(project => project.id === id);

    const project = await prisma.projects.findUnique({
        where: {
            id: id
        }
    })

    if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" });
    }

    res.status(200).json(project);
})

router.post('/projects', async (req, res) => {

    if (!req.body.nome || !req.body.descricao) {
        return res.status(400).json({ message: "Nome e descrição são obrigatórios" })
    }

    // const project = {
    //     ...req.body,
    //     id: nextId
    // }

    // projects.push(project)
    // console.log(projects)

    // nextId++

    const project = await prisma.projects.create({
        data: {
            nome: req.body.nome,
            descricao: req.body.descricao
        }
    })

    res.status(201).json({ message: "Projeto recebido com sucesso" })
})

router.put('/projects/:id', async (req, res) => {

    const id = Number(req.params.id);

    try {
        const project = await prisma.projects.findUnique({
            where: {
                id: id
            }
        })

        if (!project) {
            return res.status(404).json({ message: "Projeto não encontrado" })
        }

        const camposEnviados = Object.keys(req.body);
        if (camposEnviados.length === 0) {
            return res.status(400).json({ message: "Valores inválidos" })
        }

        const camposPermitidos = ["nome", "descricao"];


        const verificaCamposEnviados = camposEnviados.some(campo =>
            !camposPermitidos.includes(campo)
        )

        if (verificaCamposEnviados) {
            return res.status(400).json({ message: "Os campos enviados não são válidos" })
        }

        await prisma.projects.update({
            where: {
                id: id
            },
            data: req.body
        })

        res.status(200).json({ message: 'Projeto atualizado com sucesso' })

    } catch (error) {

        console.log('console.log: ', error)
        if (error.code === "P2025") {
            res.status(404).json({ message: 'Projeto não encontrado' })
        } else {
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

})

router.delete('/projects/:id', async (req, res) => {

    const id = Number(req.params.id);

    try {
        const projectExists = await prisma.projects.findUnique({
            where: {
                id: id
            }
        });

        if (!projectExists) {
            return res.status(404).json({ message: "Projeto não encontrado" });
        }

        await prisma.projects.delete({
            where: {
                id: id
            }
        })

        res.status(200).json({ message: 'Projeto deletado com sucesso' });

    } catch (error) {

        if (error.code === "P2025") {
            return res.status(404).json({ message: "Projeto não encontrado" })
        } else {
            return res.status(500).json({ message: "Erro interno do servidor" })
        }

    }
});


export { router };

