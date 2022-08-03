import axios from 'axios';

let token=JSON.parse(sessionStorage.getItem('token'))

const axiosClient =  axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials:true,
    timeout:8000,
    headers:{'Access-Control-Allow-Origin': "http://localhost:4200", 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                            }
});



export default axiosClient;