import axios from "../setup/axios"
const feactAllUser = async (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`)
}
const feactAllGara = async (page, limit) => {
    return axios.get(`/api/v1/garanoncensorship/read?page=${page}&limit=${limit}`)
}
const accepGara = async (id) => {
    return axios.put(`/api/v1/accep/gara`, { id });
}
const createCar = async (nameCar, avata, descriptions, selectedCarCompany) => {
    return axios.post(`/api/v1/car/create`, { nameCar, avata, descriptions, selectedCarCompany })
}
const updateCar = async (id, nameCar, avata, descriptions, carCompanyId) => {
    return axios.put(`/api/v1/car/update`, { id, nameCar, avata, descriptions, carCompanyId });
}
const readHanndBook = async (page, limit, staffId) => {
    return axios.get(`/api/v1/handBook/read?page=${page}&limit=${limit}&staffId=${staffId}`);
}

const createHandbook = async (data) => {
    return axios.post(`/api/v1/handBook/create`, { ...data })
}
const updateHandbook = async (data) => {
    return axios.put(`/api/v1/handBook/update`, { ...data })
}
const getAllGarabyPageStaff = async (page, limit) => {
    return axios.get(`/api/v1/gara/getAllGarabyPage?page=${page}&limit=${limit}`)
}




export {
    feactAllUser, feactAllGara, accepGara, createCar, updateCar, readHanndBook, createHandbook, updateHandbook, getAllGarabyPageStaff
}
