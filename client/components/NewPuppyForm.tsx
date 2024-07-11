import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreatePuppy } from '../hooks/api'

export default function NewPuppyForm() {
  const newPup = useCreatePuppy()
  const navigate = useNavigate()

  const [formState, setFormState] = useState({
    name: '',
    breed: '',
    owner: '',
    image: '',
  })

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    if (newPup.isPending) {
      return
    }
    await newPup.mutateAsync({ puppy: formState })
    navigate('/')
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {/* <img className="img-circle" src={puppy.image} alt={puppy.name} /> */}
      <div className="form-item">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          id="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="breed">Breed:</label>
        <input
          name="breed"
          id="breed"
          value={formState.breed}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="owner">Owner:</label>
        <input
          name="owner"
          id="owner"
          value={formState.owner}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="image">Image:</label>
        <input
          name="image"
          id="image"
          value={formState.image}
          onChange={handleChange}
        />
      </div>
      <button data-pending={newPup.isPending}>Submit</button>
    </form>
  )
}
