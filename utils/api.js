const LOCAL_API = "http://localhost:5000/api";
const PROD_API = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const API =
  process.env.NODE_ENV === "development" ? LOCAL_API : PROD_API;
