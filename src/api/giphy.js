import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const getGifs = async ({ pageParam = 0, category = '' }) => {

    const endpoint = 
        category 
            ? `${ BASE_URL }/search` 
            : `${ BASE_URL }/trending`;

    const { data } = await axios.get( endpoint, {
        params: {
            api_key: API_KEY,
            q: category,
            lang: 'es',
            rating: 'g',
            offset: pageParam,
            limit: 25,
        }
    })

    return data.data.map( gif => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url,
        price: Math.floor( Math.random() *  50 ) + 10, // un valor aleatorio entre 10 y 60
        stock: Math.floor( Math.random() *  20 ) + 1 // un valor aleatorio entre 1 y 20
    }))

}