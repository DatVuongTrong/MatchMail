"use server"

import config from "@/app/config";
import { CreateUserInput, LoginUserInput } from "@/services/constants";
import { cookies } from 'next/headers'

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
        if (response.ok) {
            cookies().set('access_token', data.access_token)
            cookies().set('refresh_token', data.refresh_token)
            cookies().set('user_id', data.user_id)
        }

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

export const renewToken = async () => {
    try {
        const refresh_token = cookies().get('refresh_token');
        const response = await fetch(`${API_URL}/renew_token`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(refresh_token),
        });
        const data = await response.json();

        return { data, ok: response.ok };
    } catch (error) {
        console.error('Error renew token:', error);
        throw error;
    }
};