import type { Puppy } from '../models/Puppy.ts'
import initialData from './initial-data.ts'
import * as fs from 'node:fs/promises'
import type { PuppyData } from '../models/Puppy.ts'

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

export async function updatePuppy(
  id: number,
  newPuppy: PuppyData,
): Promise<void> {
  //get the puppy to edit
  const data = await getPuppies()
  const newData = data.puppies.map((puppy: Puppy) => {
    if (puppy.id === id) {
      return { ...newPuppy, id }
    } else {
      return puppy
    }
  })
  const newObj = {
    puppies: newData,
  }
  //take the data and stringify?

  const string = JSON.stringify(newObj)
  //write data to that puppy

  await fs.writeFile('.data.json', string, 'utf-8')
}
