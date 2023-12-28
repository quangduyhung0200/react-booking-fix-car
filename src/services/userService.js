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

const registerGara = async (nameGara, contenMarkdown, contenHTML, addressGara, provindId, avata, phone, description, emailUser, id) => {
    return await axios.post(`/api/v1/register/gara`, {
        nameGara: nameGara,
        descriptionHTML: contenHTML,
        descriptionMarkDown: contenMarkdown,
        address: addressGara,
        provindId: provindId,
        avata: avata,
        phone: phone,
        description: description,
        emailUser: emailUser,
        id: id
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
const createCar = async (nameCar, avata, descriptions, selectedCarCompany) => {
    return axios.post(`/api/v1/car/create`, { nameCar, avata, descriptions, selectedCarCompany })
}
const updateCar = async (id, nameCar, avata, descriptions, carCompanyId) => {
    return axios.put(`/api/v1/car/update`, { id, nameCar, avata, descriptions, carCompanyId });
}
const deleteCar = async (car) => {
    return axios.delete(`/api/v1/car/delete`, { data: { id: car.id } });
}
const getDataGara = async (idInput) => {
    return axios.get(`/api/v1/gara/readdata?id=${idInput}`);
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
const registerCartoGara = async (dataSave) => {
    return axios.post(`/api/v1/gara/registerCar`, { ...dataSave });
}
const getAllTime = async () => {
    return axios.get(`/api/v1/gara/readTime`);
}
const createBulkScheduleGara = async (data) => {
    return axios.post(`/api/v1/gara/createBulkSchedule`, { ...data });
}
const readAllScheduleByDate = async (garaID, Date) => {
    return axios.get(`/api/v1/schedule/read?garaId=${garaID}&day=${Date}`);
}
const readAllCarByGara = async (garaID) => {
    return axios.get(`/api/v1/gara/getAllCar?id=${garaID}`);
}
const deletePickCar = async (garaId, carId, serviceId) => {
    return axios.delete(`/api/v1/gara/deletePickCar`, { data: { garaId, carId, serviceId } });
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

const getAllBookingByDay = async (garaId, date) => {
    return axios.get(`/api/v1/gara/getListBooking?garaId=${garaId}&date=${date}`);
}
const comfimBooking = async (data) => {
    return axios.post(`/api/v1/gara/comfimeBooking`, data);
}
const getAllOrderByDay = async (garaId, date) => {
    return axios.get(`/api/v1/gara/getListOrder?garaId=${garaId}&date=${date}`);
}

const finishOrder = async (data) => {
    return axios.post(`/api/v1/gara/finishOrder`, data);
}
const canserOrder = async (data) => {
    return axios.post(`/api/v1/gara/canserOrder`, data);
}

const getAllOrderUser = async (userId) => {
    return axios.get(`/api/v1/getAllOrder?userId=${userId}`);
}









export {
    getAllGender, registerUser, loginUser, getUserAccount, userLogout, feactAllUser, getAllProvind, registerGara, feactAllGara,
    getGaraInfo, accepGara, getTopGara, feactAllCar, feactAllCarCompany, createCar, updateCar, deleteCar, getDataGara, getDataPickCar,
    getDataCarById, getAllPrice, getAllPayment, getAllService, registerCartoGara, getAllTime, createBulkScheduleGara, readAllScheduleByDate,
    readAllCarByGara, deletePickCar, readAllServiceCarGara, readAllServiceCarGaraPaymentPrice, postBooking, veryfyBooking, getAllBookingByDay,
    comfimBooking, getAllOrderByDay, finishOrder, canserOrder, getAllOrderUser
}
