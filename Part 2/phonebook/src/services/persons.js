import axios from 'axios';

const baseURL = 'http://192.168.0.6:3001/persons/'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then((response)=>{
        return response.data
    })
}

const createPerson = (person) => {
    const request = axios.post(`${baseURL}`, person)
    return request.then((response)=>{
        return response.data
    })
}

const updatePerson = (person) => {
    const request = axios.put(`${baseURL}${person.id}`, person)
    return request.then((response)=>{
        return response.data
    })
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}${id}`)
    return request.then((response)=>{
        return (response.status === 200)
    }) 
}

// Export
// Don't need to use key: value format 'cause key and value names are the same
export default {
    getAll,
    createPerson,   
    updatePerson,
    deletePerson,
}