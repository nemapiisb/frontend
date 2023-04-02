import axios from 'axios';
import authHeader from "./auth-header";

const AD_API_BASE_URL = "http://localhost:8080/anuncios";

class AdService {

    getAll(){
        return axios.get(AD_API_BASE_URL);
    }

    createAd(anuncio){
        let headers = authHeader();
        return axios.post(AD_API_BASE_URL, anuncio,{ headers });
    }

    getOne(anuncioId){

        return axios.get(AD_API_BASE_URL + '/' + anuncioId);
    }

    getCategoria(anuncioCategoria){
        return axios.get(AD_API_BASE_URL + '/' + anuncioCategoria);
    }

    updateAd(anuncio, anuncioId){
        let headers = authHeader();
        return axios.put(AD_API_BASE_URL + '/' + anuncioId, anuncio,{ headers });
    }

    deleteAd(anuncioId){
        let headers = authHeader();
        return axios.delete(AD_API_BASE_URL + '/' + anuncioId, { headers });
    }
}

export default new AdService()