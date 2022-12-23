const API_URL = "http://localhost:5000/";

const getUser = (token) => {
    var getData = {
        email: "test@test.com",
        password: "password"
      };
      
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;',
            'Access-Control-Allow-Origin': token,
        }
      };
      
      axios.post('http://<host>:<port>/<path>', getData, axiosConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
};


const signIn = (email, password) => {
    const signInRequest = {
        email: email,
        password: password
    }

    return axios
        .post(API_URL + "signIn", signInRequest)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};