import axios from "../setup/axios"
const getAllGender = async () => {
    return await axios.get(`/api/v1/gender/read`)
}
const registerUser = async (datainput) => {
    return await axios.post(`/api/v1/register/user`, {
        address: datainput.address,
        gender: datainput.gender,
        phone: datainput.phone,
        userName: datainput.userName,
        comfimPassword: datainput.comfimPassword,
        email: datainput.email,
        password: datainput.password,
        groupId: datainput.group,
        avata: datainput.avata
    })
}

const getUserAccount = async () => {
    return axios.get(`/api/v1/account`);
}
const getAllProvind = async () => {
    return await axios.get(`/api/v1/provind/read`)
}
const getGaraInfo = async (id) => {
    return axios.get(`/api/v1/detailGara/read/${id}`);
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
const getDataPickCar = async (carcompanyid) => {
    return axios.get(`/api/v1/car/readCarInfoByCarCompany?carCompany=${carcompanyid}`);
}
const getDataCarById = async (carid) => {
    return axios.get(`/api/v1/car/readCarInfoByCariD?carId=${carid}`);
}
const getAllPrice = async (carid) => {
    return axios.get(`/api/v1/price/read`);
}

const getAllPayment = async (carid) => {
    return axios.get(`/api/v1/payment/read`);
}
const getAllService = async (carid) => {
    return axios.get(`/api/v1/service/read`);
}
const readAllScheduleByDate = async (garaID, Date) => {
    return axios.get(`/api/v1/schedule/read?garaId=${garaID}&day=${Date}`);
}
const readAllCarByGara = async (garaID) => {
    return axios.get(`/api/v1/gara/getAllCar?id=${garaID}`);
}
const readAllServiceCarGara = async (garaId, carId) => {
    return axios.get(`/api/v1/booking/readService?garaId=${garaId}&carId=${carId}`);
}
const readAllServiceCarGaraPaymentPrice = async (garaId, carId, serviceId) => {
    return axios.get(`/api/v1/booking/readPricePayment?garaId=${garaId}&carId=${carId}&serviceId=${serviceId}`);
}
const postBooking = async (data) => {
    return axios.post(`/api/v1/booking/createBooking`, { ...data });
}
const veryfyBooking = (data) => {
    return axios.post('/api/v1/vetyfy-booking', data)
}
const getAllCommentByGara = async (garaId) => {
    return axios.get(`/api/v1/comment/read?garaId=${garaId}`);
}
const getAllGara = async () => {
    return axios.get(`/api/v1/gara/getAllGara
    `);
}

const getAllGarabyProvind = async (provindId) => {
    return axios.get(`/api/v1/gara/readGarabyProvind?provindId=${provindId}`);
}
const getGarabyProvindCarCompanyCar = async (provindId, carCompanyId, carId) => {
    return axios.get(`/api/v1/gara/readGarabyProvindCarCompanyCar?provindId=${provindId}&carCompanyId=${carCompanyId}&carId=${carId}`);
}

const getAllDay = async (garaId) => {
    return axios.get(`/api/v1/gara/getAllDay?garaId=${garaId}`);
}
const getTopHandBook = async (limit) => {
    return axios.get(`/api/v1/handbook/getTopHandBook?limit=${limit}`);
}
const getTopHandBookRelateto = async (limit, id) => {
    return axios.get(`/api/v1/handbook/getHandBookRelateto?limit=${limit}&handbookId=${id}`);
}
const searchHandBook = async (text) => {
    return axios.get(`/api/v1/gara/searchHandBook?text=${text}`);
}


const forgetpassword = (data) => {
    return axios.put('/api/v1/user/forgetpassword', { data })
}



export {
    getAllGender, registerUser, getUserAccount, getAllProvind, getGaraInfo, getTopGara, feactAllCar, feactAllCarCompany, getDataPickCar, getDataCarById, getAllPrice,
    getAllPayment, getAllService, readAllScheduleByDate, readAllCarByGara, readAllServiceCarGara, readAllServiceCarGaraPaymentPrice,
    postBooking, veryfyBooking, getAllCommentByGara, getAllGara, getAllGarabyProvind, getGarabyProvindCarCompanyCar, getAllDay, getTopHandBook,
    getTopHandBookRelateto, searchHandBook, forgetpassword
}
