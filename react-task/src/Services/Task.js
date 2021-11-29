import axios from "axios";

const url = '/api/notes'

let token = null

const setToken = newtoken => {
    token = `Bearer ${newtoken}`
}


const AllTask = async () => {
    const tasks = axios.get(url)
    return tasks
}

const CreateTask = async (a) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const newTask = {
        content: a
    }

    const task = await axios.post(url, newTask, config)
    return task
}

const DeleTask = async (id) => {
    const Dele = await axios.delete(`${url}/${id}`)
    return Dele
}

export { AllTask, CreateTask, DeleTask, setToken }