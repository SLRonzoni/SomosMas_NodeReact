const ModelContacts = require('../models').Contacts
const { emailContact } = require('../services/emailContact')
const { getModelById, updateModel, deleteModel} = require('./base.controller')


const createContact = async (req, res) => {

    try {
        const { name, phone, email, message } = req.body

        const contact = await ModelContacts.create({
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
        })

        const emailSend = await emailContact(contact)
        res.status(201).json({ contact, emailSend })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const getAllContacts = async (req, res) => {

    try {
        const contacts = await ModelContacts.findAll()
        res.status(200).json({ contacts })

    } catch (error) {
        res.status(500).json({ error })
    }
}

const getContactById = async (req, res) => {
    getModelById(req,res,ModelContacts)
}

const updateContact = async (req, res) => {

    updateModel(req,res,ModelContacts,req.body)
}

const deleteContact = async (req, res) => {
    deleteModel(req,res,ModelContacts)
}



module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
}