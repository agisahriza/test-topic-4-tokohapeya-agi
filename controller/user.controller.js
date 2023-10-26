const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {
    const {
        username, password,
    } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password,
            },
        });

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}

async function InsertWithProfile(req, res) {
    const {
        username, password,
        name, date_of_birth,
        address, bio, avatar,
    } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password,
            },
        });

        const profile = await prisma.profile.create({
            data: {
                name, 
                date_of_birth: new Date(date_of_birth),
                address, 
                bio, 
                avatar,
                user_id: user?.id,
            },
        });

        let resp = ResponseTemplate({user, profile}, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}

async function Get(req, res) {

    const { username } = req.query

    const payload = {}

    if (username) {
        payload.username = username
    }

    try {
        const users = await prisma.user.findMany({
            where: payload,
            include: {
                profile: true,
            },
        });

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { username, password } = req.body
    const { id } = req.params

    const payload = {}

    if (!username && !password) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (username) {
        payload.username = username
    }

    if (password) {
        payload.password = password
    }


    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { id } = req.params

    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(null, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}

module.exports = {
    Insert,
    InsertWithProfile,
    Get,
    Update,
    Delete
}