import axios from "axios";

const gorest = axios.create({
    baseURL: "https://gorest.co.in/public/v2/",
    params: {
        "access-token": "2b9b5a3f7b336bbb8e271e540612f70a3039ec8e1791172d4c7ea014b3a54141"
    }
});

export default gorest;