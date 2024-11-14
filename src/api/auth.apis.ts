import axios from "axios";
import { RegisterUserValues } from "../types/types";

const API_URL = import.meta.env.VITE_AUTH_API_URL;

export const register = async (
  user: RegisterUserValues
): Promise<RegisterUserValues | undefined> => {
  try {
    const response = await axios.post(`${API_URL}/register`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
