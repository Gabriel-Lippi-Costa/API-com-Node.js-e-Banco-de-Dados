/*

VÍDEO PARA TIRAR DÚVIDAS:

https://www.youtube.com/watch?v=PyrMT0GA3sE

*/

import express from 'express' //Importando biblioteca, ela está instalada mas para utilizar preciso importar ela.
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express() //app passou a receber express como função
app.use(express.json())

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            tel: req.body.tel,
            adress: req.body.adress,
            password: req.body.password
        }
    })

    res.status(201).json(req.body)

})

/*
TIPOS DE ROTAS (HTTP MÉTODOS):

Get -> Listar
Post -> Criar
Put -> Editar vários
Patch -> Editar um 
Delete -> Deletar 

*/

app.get('/usuarios', async (req, res) => {
    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                email: req.query.email,
                name: req.query.name,
                tel: req.query.tel,
                adress: req.query.adress,
                password: req.query.password
            }
        })
    } else {
        users = await prisma.user.findMany()
    }


    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.name,
            tel: req.body.tel,
            adress: req.body.adress,
            password: req.body.password
        }
    })

    res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso!' })
})

app.listen(3000) //Porta do Computador

/*

1) Tipo de Rota / Método HTTP
2) Endereço
*/ 