import axios from 'axios';
import { axiosApiInstance } from './helper';


const getCategoryData = async (id = null) => {
    let api = 'category/get-data';
    if (id) api += `/${id}`;

    return axiosApiInstance.get(`${api}`)
        .then((response) => {
            return response.data;

        })
        .catch((error) => {
            return null;
        })
};

const getCategoryDataTrash = async () => {
    return axiosApiInstance.get('/category/trash-data')
        .then((response) => {
            return response.data;

        })
        .catch((error) => {
            return null;
        })

};

export { getCategoryData, getCategoryDataTrash };