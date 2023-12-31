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
const getAllBookingbyPageStaff = async (page, limit) => {
    return axios.get(`/api/v1/booking/getAllBookingbypage?page=${page}&limit=${limit}`)
}
const getAllStatus = async () => {
    return axios.get(`/api/v1/status/getAllStatus`)
}

const updateBooking = async (data) => {
    return axios.put(`/api/v1/booking/updateStatus`, { ...data })
}

const searchBooking = async (data) => {
    return axios.get(`/api/v1/booking/searchBooking?user=${data.user}&gara=${data.gara}&car=${data.car}&service=${data.service}&date=${data.date}&price=${data.price}&status=${data.status}&`)
}

const searchUser = async (data) => {
    return axios.get(`/api/v1/user/searchUser?user=${data.user}&group=${data.group}`)
}
const searchGaranocenser = async (data) => {
    return axios.get(`/api/v1/gara/searchGaranocenser?gara=${data.gara}&provind=${data.provind}`)
}
const searchGara = async (data) => {
    return axios.get(`/api/v1/gara/searchGara?gara=${data.gara}&provind=${data.provind}`)
}

const searchCar = async (data) => {
    return axios.get(`/api/v1/car/searchCar?car=${data.car}&carcompany=${data.carcompany}`)
}


const createCarCompany = async (data) => {
    return axios.post(`/api/v1/carCompany/createCarCompany`, { ...data })
}

const updateCarCompany = async (data) => {
    return axios.put(`/api/v1/carCompany/updateCarCompany`, { ...data })
}

const searchCarCompany = async (data) => {
    return axios.get(`/api/v1/carCompany/searchCarcompany?carcompany=${data.carcompany}`)
}


const getAllCommentbypage = async (page, limit) => {
    return axios.get(`/api/v1/comment/getComentbypage?page=${page}&limit=${limit}`)
}


const searchComment = async (data) => {
    return axios.get(`/api/v1/comment/searchComment?gara=${data.gara}&user=${data.user}&rate=${data.rate}`)
}


const searchHandbookStaff = async (data) => {
    return axios.get(`/api/v1/handbook/searchHandbookStaff?title=${data.title}&staff=${data.staff}&status=${data.status}`)
}
const deniceGara = async (id) => {
    return axios.put(`/api/v1/gara/deniceGara`, { id });
}


export {
    feactAllUser, feactAllGara, accepGara, createCar, updateCar, readHanndBook, createHandbook, updateHandbook, getAllGarabyPageStaff,
    getAllBookingbyPageStaff, getAllStatus, updateBooking, searchBooking, searchUser, searchGaranocenser, searchGara, searchCar, createCarCompany, updateCarCompany,
    searchCarCompany, getAllCommentbypage, searchComment, searchHandbookStaff, deniceGara
}
