import axios from "axios";

const helper = {
  baseUrl: function () {
    const URL = "http://localhost:4000/";
    return URL;
  },
  postData: async function (url, data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "true"
      }
    };
    return await axios
      .post(url, data, axiosConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getData: async function (url, data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "true"
      }
    };
    return await axios.get(url, axiosConfig).then((res) => {
      if (res) {
        return res;
      }
    });
  }
};

export default helper;
