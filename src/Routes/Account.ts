import { Router, Request, Response } from 'express'
import { graphql } from 'graphql'
import schema from '../Schema'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const query = `
        {
            people {
                firstName
                lastName
                balance
            }
        }
    `
    const result = await graphql(schema, query)
    res.json(result)
})

router.get('/:id', async (req: Request, res: Response) => {
    const query = `
        {
            person (id: "${req.params.id}") {
                firstName
                lastName
                balance
            }
        }
    `
    const result = await graphql(schema, query)
    res.json(result)
})

export default router