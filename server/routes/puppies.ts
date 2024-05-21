import express from 'express'
import * as store from '../store.ts'
import { Puppy } from '../models/Puppy.ts'
import puppies from './initial-data.ts'

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
