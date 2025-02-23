import axios from 'axios';
import { axiosApiInstance } from './helper';


const getCategoryData = async () => {

    return axiosApiInstance.get('/category/get-data')
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