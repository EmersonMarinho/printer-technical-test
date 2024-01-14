import { Router } from 'express'
import { userRouter } from '../routes/user.route'
import directoryRouter from '../routes/directory.route'

const router = Router()

router.use("/", userRouter)
router.use("/", directoryRouter)


export default router
