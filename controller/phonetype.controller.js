const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {
    const {
        name, price, brand_id,
    } = req.body

    try {
        const phoneType = await prisma.phoneType.create({
            data: {
                name, price, brand_id,
            },
        });

        let resp = ResponseTemplate(phoneType, 'success', null, 200)
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
        const phoneTypes = await prisma.phoneType.findMany({
            where: payload,
        });

        let resp = ResponseTemplate(phoneTypes, 'success', null, 200)
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
        name, price, brand_id,
    } = req.body
    
    const { id } = req.params

    const payload = {}

    if (!name && !price && !brand_id) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (name) {
        payload.name = name
    }

    if (price) {
        payload.price = price
    }

    if (brand_id) {
        payload.brand_id = brand_id
    }

    try {
        const phoneType = await prisma.phoneType.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(phoneType, 'success', null, 200)
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
        const phoneType = await prisma.phoneType.delete({
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