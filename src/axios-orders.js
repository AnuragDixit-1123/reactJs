
import axios from 'axios';

/**
 * 
 * @description 
 * It creates the instance for the axios so that we can make the api call 
 * any time we want with the default value
 */
const instance = axios.create({
    baseURL: 'https://react-my-burger-d9d79.firebaseio.com/'
});

export default instance;