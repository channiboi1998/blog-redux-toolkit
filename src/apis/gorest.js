import axios from "axios";

const gorest = axios.create({
    baseURL: "https://gorest.co.in/public/v2/",
});

export default gorest;