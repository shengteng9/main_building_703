import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 1000,
  headers: {
    'Content-Type':'application/json'
  },
});

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default instance;
