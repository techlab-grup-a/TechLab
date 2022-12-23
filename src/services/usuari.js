const API_URL = 'http://localhost:5000';

export function postUser(id_usr, email, nom, cognom) {
  var postData = {
    id_usr: id_usr,
    email: email,
    nom: nom,
    cognom: cognom
  };

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;'
    },
  };

  axios
    .post(API_URL + '/usr/', postData, axiosConfig)
    .then((res) => {
      console.log('RESPONSE RECEIVED: ', res);
    })
    .catch((err) => {
      console.log('AXIOS ERROR: ', err);
    });
}

export function getUser(id_usr) {
  
}
