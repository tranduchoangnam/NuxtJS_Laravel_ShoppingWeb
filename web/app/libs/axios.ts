import axios from "axios";
import _assign from "lodash/assign";

const instance = axios.create({
  baseURL: "/api",
});

if (process.server) {
  instance.interceptors.request.use((config: any) =>
    _assign({}, config, {
      url:
        decodeURI(config.url) === config.url
          ? encodeURI(config.url)
          : config.url,
    })
  );
}

export default instance;
