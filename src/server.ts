import express from 'express'
import { prismaClient } from './database'

const app = express()
app.use(express.json())

const port = process.env.PORT ?? 4000

app.get('/books', async (request, response) => {
    try {
        const books = await prismaClient.book.findMany()
        return response.json(books)
    } catch (error) {
        return response.status(500).json({ error: 'An error occurred while fetching books' })
    }
})

app.post('/books', async (request, response) => {
    const { description, name } = request.body
    try {
        const book = await prismaClient.book.create({
            data: {
                description,
                name,
            },
        })
        return response.json(book)
    } catch (error) {
        return response.status(500).json({ error: 'An error occurred while creating the book' })
    }
})

app.listen(port, () => console.log('Server is running on port', port))
