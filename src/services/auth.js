const API_URL = "http://localhost:8080/";

const singUp = (nom, cognom, email, password) => {
    const singUpRequest = {
        nom: nom,
        cognom: cognom,
        email: email,
        password: password
    }

    return axios.post(API_URL + "signUp", singUpRequest);
};

const config = {
    headers:{
        "X-Auth-Token": clientToken,
        "content-type": "application/json"
    }
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

const signOut = () => {
    localStorage.removeItem("user");
};