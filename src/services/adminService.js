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
const getAllGroup = async () => {
    return axios.get(`/api/v1/user/getAllGroup`);
}
const updateUser = async (data) => {
    return axios.put(`/api/v1/user/update`, { ...data });
}
const getAllHandbook = async (page, limit) => {
    return axios.get(`/api/v1/handBook/readAll?page=${page}&limit=${limit}`);
}

const deleteUser = async (user) => {
    return axios.delete(`/api/v1/user/delete`, { data: { id: user.id } });
}
const deleteHandbook = async (handbook) => {
    return axios.delete(`/api/v1/handBook/delete`, { data: { id: handbook.id } });
}
const deleteGara = async (gara) => {
    return axios.delete(`/api/v1/gara/delete`, { data: { id: gara.id } });
}



export {
    deleteCar, getHandBookById, accepHandBook, getAllGroup, updateUser, getAllHandbook, deleteUser, deleteHandbook, deleteGara
}
