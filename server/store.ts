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

//  Small change

export async function makePuppy(newPuppy: PuppyData): Promise<void> {
  const data = await getPuppies() //use the getPuppies function
  const curId = data.puppies.length // find the lenght
  const id = curId + 1 // and add one to stop the error.
  data.puppies.push({ id: id, ...newPuppy }) // cross my fingers the .push methode works and copy it across
  const string = JSON.stringify(data) // pretty much the same as above
  // Write Data to that puppies
  await fs.writeFile('.data.json', string, 'utf-8')
}
