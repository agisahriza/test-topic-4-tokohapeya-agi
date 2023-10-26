const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {
    const {
        name, date_of_birth,
        address, bio, avatar,
        user_id,
    } = req.body

    try {
        const profile = await prisma.profile.create({
            data: {
                name, 
                date_of_birth: new Date(date_of_birth),
                address, 
                bio, 
                avatar,
                user_id,
            },
        });

        let resp = ResponseTemplate(profile, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}

async function Get(req, res) {

    const { name } = req.query

    const payload = {}

    if (name) {
        payload.name = name
    }

    try {
        const profiles = await prisma.profile.findMany({
            where: payload,
        });

        let resp = ResponseTemplate(profiles, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {
    const {
        name, date_of_birth,
        address, bio, avatar,
    } = req.body
    
    const { id } = req.params

    const payload = {}

    if (!name && !date_of_birth && !address && !bio && !avatar) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (name) {
        payload.name = name
    }
    if (date_of_birth) {
        payload.date_of_birth = new Date(date_of_birth)
    }

    if (address) {
        payload.address = address
    }

    if (bio) {
        payload.bio = bio
    }

    if (avatar) {
        payload.avatar = avatar
    }

    try {
        const profile = await prisma.profile.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(profile, 'success', null, 200)
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
        const profile = await prisma.profile.delete({
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
    Get,
    Update,
    Delete
}