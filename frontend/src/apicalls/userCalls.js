import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/user/current");
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error);

    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error("Network error or server not responding");
    }
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/api/user/all");
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Get all users error:", error);
  }
}

