import axios from "../setup/axios"


const getDataGara = async (idInput) => {
    return axios.get(`/api/v1/gara/readdata?id=${idInput}`);
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
const deletePickCar = async (garaId, carId, serviceId) => {
    return axios.delete(`/api/v1/gara/deletePickCar`, { data: { garaId, carId, serviceId } });
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

export {
    getDataGara, registerCartoGara, getAllTime, createBulkScheduleGara, deletePickCar, getAllBookingByDay, comfimBooking, getAllOrderByDay,
    finishOrder, canserOrder
}
