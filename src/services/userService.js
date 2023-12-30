import axios from "../setup/axios"



const loginUser = async (email, password) => {
    return await axios.post('/api/v1/login/user', {
        email: email,

        password: password
    })
}//done

const userLogout = async () => {
    return axios.post(`/api/v1/logout/user`);
}//done



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
}//done



























const getAllOrderUser = async (userId) => {
    return axios.get(`/api/v1/getAllOrder?userId=${userId}`);
}
const createComment = async (data) => {
    return axios.post(`/api/v1/comment/create`, { ...data });
}













export {
    loginUser, userLogout, registerGara,



    getAllOrderUser, createComment,
}
