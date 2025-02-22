import axios from 'axios';


const getCategoryData = async () => {

    return axios.get(process.env.NEXT_PUBLIC_API_URL + '/category/get-data')
        .then((response) => {
            return response.data;

        })
        .catch((error) => {
            return null;
        })
};

export { getCategoryData };