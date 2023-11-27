import axios from "axios";
import userApi from "./apiList";

const logMessage = (type, action, payload) => {
    return axios
      .post(userApi.logger, {
        title: "Matrixbuilder Api- logger",
        body: { type, action, info: payload }
      })
      .then(() => {
      });
  };
  
  export default logMessage;
  