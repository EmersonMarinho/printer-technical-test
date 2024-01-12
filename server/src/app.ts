import express from 'express'
import AppRouter from './routes'
import cors from 'cors'

class App {
  public app: express.Express

  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(express.json())
    this.app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
  }

  private routes(): void {
    this.app.use(AppRouter)
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  }
}

export { App }
