import axios from "~/libs/axios";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const response = await axios.get("/api/auth", {
    headers: { Authorization: `Bearer ${cookies.token}` },
  });
  console.log(response);
  return response.data;
});
