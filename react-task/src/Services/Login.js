import axios from "axios";

const url = '/api/login'

const Login = async (credential) => {
    const { data } = await axios.post(url, credential)
    return data 
}

export default { Login }