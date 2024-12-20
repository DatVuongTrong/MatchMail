"use server"

import config from "@/app/config";
import { CreateUserInput, LoginUserInput, UpdateUserInput } from "@/services/constants";
import { cookies } from 'next/headers'

const API_URL = config.API_SERVER;
const MAX_NUMBER_OF_TRIES = 3

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
            cookies().set('user_id', data.user.id)
        }

        return { data, ok: response.ok };
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        cookies().delete('access_token')
        cookies().delete('refresh_token')
        cookies().delete('user_id')
    } catch (error) {
        console.error('Error logging out:', error);
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

export const updateUser = async (updateUserInput: UpdateUserInput): Promise<{ data: any; ok: boolean }> => {
    try {
        for (let tries = 0; tries < MAX_NUMBER_OF_TRIES; tries++) {
            const access_token = cookies().get('access_token')?.value;
            const userId = cookies().get('user_id')?.value;

            const response = await fetch(`${API_URL}/update_user/${userId}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${access_token}`,
                },
                body: JSON.stringify(updateUserInput),
            });
            const data = await response.json();
            if (response.ok === true) {
                return { data, ok: response.ok };
            } else {
                await renewToken();
            }
        }
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
    return { data: null, ok: false };
}

export const renewToken = async () => {
    try {
        const refresh_token = cookies().get('refresh_token')?.value;
        const response = await fetch(`${API_URL}/renew_access_token`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ refresh_token: refresh_token }),
        });
        const data = await response.json();

        if (response.ok) {
            cookies().set('access_token', data.access_token.token)
        }

        return { data: cookies().get('access_token')?.value, ok: response.ok };
    } catch (error) {
        console.error('Error renew token:', error);
        throw error;
    }
};