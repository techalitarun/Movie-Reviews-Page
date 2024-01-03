import axios from "axios";

export default axios.create({
  baseURL: "", //backend url
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
