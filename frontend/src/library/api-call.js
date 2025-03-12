import axios from 'axios';
import { axiosApiInstance } from './helper';

const getProductData = async () => {
    return axiosApiInstance.get('/product/get-data')
        .then((response) => {
            return response.data;

        })
        .catch((error) => {
            return null;
        })
};

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

const getColorData = async (id = null) => {
    let api = 'color/get-data';
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
const getColorDataTrash = async () => {
    return axiosApiInstance.get('/color/trash-data')
        .then((response) => {
            return response.data;

        })
        .catch((error) => {
            return null;
        })

};

export { getCategoryData, getCategoryDataTrash, getColorData, getColorDataTrash, getProductData };