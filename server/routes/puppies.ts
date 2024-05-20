import express from 'express'
import * as store from '../store.ts'

const router = express.Router()
export default router

router.get('/', async (req, res) => {
  const data = await store.getPuppies()
  res.json(data)
})
