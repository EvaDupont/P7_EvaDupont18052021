import axios from "axios"; /* bibliothèque JavaScript fonctionnant comme un client HTTP, elle permet de communiquer avec des API en utilisant des requêtes*/
import store from "../store/store";

export default () => {
  return axios.create({
    baseURL: `http://localhost:3000/api/`,

    headers: {
      Authorization: `${store.state.token}`,
    },
  });
};
