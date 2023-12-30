import axios from "../setup/axios"

const deleteCar = async (car) => {
    return axios.delete(`/api/v1/car/delete`, { data: { id: car.id } });
}

export {
    deleteCar
}
