import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const deleteOne = (id) => {
  const request = axios.delete(baseURL+`/${id}`)
  return request.then(response => response.data)
}

const modify = (person, persons, newN) => {
  const url = baseURL+`/${person.id}`
  const changedPerson = {...person, number: newN}
  const request = axios.put(url, changedPerson)
  console.log(request)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  deleteOne,
  modify
}
