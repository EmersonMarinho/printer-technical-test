import { Router } from 'express'
import { userRouter } from '../routes/user.route'

const router = Router()

router.use("/create-account", userRouter)

export default router
