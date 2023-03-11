import axios from 'axios';

const AD_API_BASE_URL = "http://localhost:8080/anuncios/anuncios";

class AdService {

    getAll(){
        return axios.get(AD_API_BASE_URL);
    }

    createAd(anuncio){
        return axios.post(AD_API_BASE_URL, anuncio);
    }

    getOne(anuncioId){
        return axios.get(AD_API_BASE_URL + '/' + anuncioId);
    }

    updateAd(anuncio, anuncioId){
        return axios.put(AD_API_BASE_URL + '/' + anuncioId, anuncio);
    }

    deleteAd(anuncioId){
        return axios.delete(AD_API_BASE_URL + '/' + anuncioId);
    }
}

export default new AdService()