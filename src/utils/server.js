import axios from "axios";
import qs from "qs"
let base = "/api";

const fetchCommon = (
  httpMethod,
  key,
  url,
  {
    header = {
      "Conent-Type": "application/json",
      "x-requested-with": "XMLHttoRequest"
    },
    responseType = "json"
  },
  requestPayload = {},
  params = {}
) => {
  let config = {
    headers: header,
    responseType: responseType
  };
  return axios({
    url: `${url}`,
    method: httpMethod,
    headers: config.headers,
    responseType: config.responseType,
    data: requestPayload,
    params,
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "brackets" });
    }
  })
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(err => {
      throw err;
    });
};

export const getRequest = (url, params, options = {}) => {
  return fetchCommon("get", null, url, options, undefined, params, false);
};
export const posttRequest = (url, data, options = {}, params) => {
  return fetchCommon("get", null, url, options, data, params, false);
};
