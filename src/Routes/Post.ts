import { Router, Request, Response } from 'express'
import { graphql } from 'graphql'
import schema from '../Schema'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const query = `
        {
            posts {
                created_by
                title
                body
                followers
            }
        }
    `
    const result = await graphql(schema, query)
    res.json(result)
})

router.get('/:id', async (req: Request, res: Response) => {
    const query = `
        {
            post (id: "${req.params.id}") {
                created_by
                title
                body
                followers
            }
        }
    `
})

export default router