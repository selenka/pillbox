import axios from 'axios';

axios.defaults.baseURL = 'https://dev.healme.mobi/api';

const CatchError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
}

export const getMedicine = async () => {
  return await axios
    .get('/medicine')
    .catch((err) => CatchError(err));
};

export const getMedicineGroups = async () => {
  return await axios
    .get('/group')
    .catch((err) => CatchError(err));
};
