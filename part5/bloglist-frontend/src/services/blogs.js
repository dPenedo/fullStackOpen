import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
};
const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.delete(`${baseUrl}/${id}`, config)

    const response = await request
    console.log("response on delete => ", response);
    return response.data
}

export default { getAll, setToken, create, update, deleteBlog };

