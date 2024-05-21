import express from 'express'
import * as store from '../store.ts'

const router = express.Router()
export default router

router.get('/', async (req, res) => {
  const data = await store.getPuppies()
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const Puppy = await store.getPuppyById(id)
  res.json(Puppy)
  if (Puppy === undefined) {
    res.sendStatus(404)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await store.updatePuppy(id, req.body)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})
