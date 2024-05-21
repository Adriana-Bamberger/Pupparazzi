import type { Puppy } from '../models/Puppy.ts'
import initialData from './initial-data.ts'
import * as fs from 'node:fs/promises'

interface Data {
  puppies: Puppy[]
}

export async function getPuppies(): Promise<Data> {
  try {
    const json = await fs.readFile('.data.json', 'utf-8')
    const data = JSON.parse(json)
    return data
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return initialData
    }
    throw error
  }
}

export async function getPuppyById(id: number): Promise<Puppy | undefined> {
  const data = await getPuppies()
  return data.puppies.find((puppy: Puppy) => puppy.id === id)
}
