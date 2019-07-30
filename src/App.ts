import express, { Router, Application, Request, Response } from 'express'
import ExpressGraphQL from 'express-graphql'

import schema from './Schema'

class App {
    public express : Application
    constructor() {
        this.express = express()

        this.setupGraphQL()

        this.mountRoutes()
    }

    private setupGraphQL() {
        this.express.use('/graphql', ExpressGraphQL({
            schema,
            graphiql: true
        }))
    }

    private mountRoutes() : void {
        const router = Router()
        router.get('/', (req : Request, res: Response) => {
            res.send('Homepage')
        })
        this.express.use('/', router)
    }
}

export default new App().express