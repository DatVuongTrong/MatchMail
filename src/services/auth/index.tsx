import config from "@/app/config";
import { CreateUserInput, LoginUserInput } from "@/services/constants";

const API_URL = config.API_SERVER;

export const loginUser = async (loginUserInput: LoginUserInput) => {
    try {
        const response = await fetch(`${API_URL}/login_user`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(loginUserInput),
        });
        const data = await response.json();

        return { data, ok: response.ok };
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const createUser = async (createUserInput: CreateUserInput) => {
    try {
        const response = await fetch(`${API_URL}/create_user`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(createUserInput),
        });
        const data = await response.json();

        return { data, ok: response.ok };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};