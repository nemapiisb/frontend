import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/vecinos";

class VecinoService {

    getVecinos(){
        return axios.get(USER_API_BASE_URL);
    }

    crearVecino(vecino){
        return axios.post(USER_API_BASE_URL, vecino);
    }


    crearAdmin(admin){
        return axios.post(USER_API_BASE_URL + '/admin',  admin);
    }

    getVecinoById(vecinoId){
        return axios.get(USER_API_BASE_URL + '/' + vecinoId);
    }

    updateVecino(vecino, vecinoId){
        return axios.put(USER_API_BASE_URL + '/' + vecinoId, vecino);
    }

    deleteVecino(vecinoId){
        return axios.delete(USER_API_BASE_URL + '/' + vecinoId);
    }
}

export default new VecinoService()