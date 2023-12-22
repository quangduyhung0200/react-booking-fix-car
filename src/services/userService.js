import axios from "../setup/axios"

const getAllGender = async () => {
    return await axios.get(`/api/v1/gender/read`)
}
const registerUser = async (address, gender, phone, userName, comfimPassword, email, password) => {
    return await axios.post(`/api/v1/register/user`, {
        address: address,
        gender: gender,
        phone: phone,
        userName: userName,
        comfimPassword: comfimPassword,
        email: email,
        password: password
    })
}
const loginUser = async (email, password) => {
    return await axios.post('/api/v1/login/user', {
        email: email,

        password: password
    })
}
const getUserAccount = async () => {
    return axios.get(`/api/v1/account`);
}
const userLogout = async () => {
    return axios.post(`/api/v1/logout/user`);
}
const feactAllUser = async (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`)
}
const getAllProvind = async () => {
    return await axios.get(`/api/v1/provind/read`)
}

const registerGara = async (nameGara, contenMarkdown, contenHTML, addressGara, provindId, avata, phone, description, emailUser) => {
    return await axios.post(`/api/v1/register/gara`, {
        nameGara: nameGara,
        descriptionHTML: contenHTML,
        descriptionMarkDown: contenMarkdown,
        address: addressGara,
        provindId: provindId,
        avata: avata,
        phone: phone,
        description: description,
        emailUser: emailUser
    })
}
const feactAllGara = async (page, limit) => {
    return axios.get(`/api/v1/garanoncensorship/read?page=${page}&limit=${limit}`)
}
const getGaraInfo = async (id) => {
    return axios.get(`/api/v1/detailGara/read/${id}`

    );
}
const accepGara = async (id) => {
    return axios.put(`/api/v1/accep/gara`, { id });
}
const getTopGara = (limit) => {
    return axios.get(`/api/v1/gara/read?limit=${limit}`)
}

const feactAllCar = async (page, limit) => {
    return axios.get(`/api/v1/car/read?page=${page}&limit=${limit}`)
}
const feactAllCarCompany = async () => {
    return axios.get(`/api/v1/carCompany/read`)
}
export {
    getAllGender, registerUser, loginUser, getUserAccount, userLogout, feactAllUser, getAllProvind, registerGara, feactAllGara,
    getGaraInfo, accepGara, getTopGara, feactAllCar, feactAllCarCompany
}
