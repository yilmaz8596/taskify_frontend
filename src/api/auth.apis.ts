import axios from "axios";
import { RegisterUserValues } from "../types/types";
import { LoginUserProps } from "../types/types";

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
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw error;
  }
};

export const login = async (user: LoginUserProps): Promise<LoginUserProps> => {
  try {
    const response = await axios.post(`${API_URL}/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
};
