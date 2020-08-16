import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 1000,
  headers: {
    'Content-Type':'application/json'
  },
});

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default instance;
