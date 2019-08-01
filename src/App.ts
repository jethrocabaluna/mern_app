import express, { Router, Application, Request, Response } from 'express'
import ExpressGraphQL from 'express-graphql'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import schema from './Schema'

// Routes
import accountRouter from './Routes/Account'
import postRouter from './Routes/Post'

dotenv.config()

class App {
    public express : Application
    constructor() {
        this.express = express()

        this.setupMiddlewares()
        this.setupGraphQL()
        this.mountRoutes()
    }

    private setupMiddlewares() {
        this.express.use(express.static(`${__dirname}/public`))
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: true }))
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
        this.express.use('/accounts', accountRouter)
        this.express.use('/posts', postRouter)
    }
}

export default new App().express