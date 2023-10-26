const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {
    const {
        name
    } = req.body

    try {
        const brand = await prisma.brandPhone.create({
            data: {
                name
            },
        });

        let resp = ResponseTemplate(brand, 'success', null, 200)
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
        const brands = await prisma.brandPhone.findMany({
            where: payload,
        });

        let resp = ResponseTemplate(brands, 'success', null, 200)
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
        name,
    } = req.body
    
    const { id } = req.params

    const payload = {}

    if (!name) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (name) {
        payload.name = name
    }

    try {
        const brand = await prisma.brandPhone.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(brand, 'success', null, 200)
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
        const brand = await prisma.brandPhone.delete({
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