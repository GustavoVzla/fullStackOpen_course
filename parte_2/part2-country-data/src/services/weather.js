import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;
console.log(api_key);
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (capital) => {
  const request = axios.get(
    `${baseUrl}?q=${capital}&appid=${api_key}&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getWeather };
