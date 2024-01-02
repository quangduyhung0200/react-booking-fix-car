import axios from "../setup/axios"

const deleteCar = async (car) => {
    return axios.delete(`/api/v1/car/delete`, { data: { id: car.id } });
}

const getHandBookById = async (id) => {
    return axios.get(`/api/v1/handBook/readById?id=${id}`);
}
const accepHandBook = async (id) => {
    return axios.put(`/api/v1/handBook/accep`, { id });
}




export {
    deleteCar, getHandBookById, accepHandBook
}
