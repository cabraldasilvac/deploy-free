import express from 'express'
import { prismaClient } from './database'

const app = express()
app.use(express.json())

const port = process.env.PORT ?? 4000

app.get('/books', async (req, res) => {
    try {
        const books = await prismaClient.book.findMany()
        return res.json(books)
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching books' })
    }
})

app.post('/books', async (req, res) => {
    const { description, name } = req.body
    try {
        const book = await prismaClient.book.create({
            data: {
                description,
                name,
            },
        })
        return res.json(book)
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the book' })
    }
})

app.listen(port, () => console.log('Server is running on port', port))
