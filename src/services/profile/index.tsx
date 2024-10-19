"use server"

import config from "@/app/config";
import { UUID } from "crypto";
import { cookies } from 'next/headers'

const API_URL = config.API_SERVER;

export const getProfile = async () => {
    try {
        const access_token = cookies().get('access_token');
        const userId = cookies().get('user_id');
        const response = await fetch(`${API_URL}/get_profile`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify(userId),
        });
        const data = await response.json();

        return { data, ok: response.ok };
    } catch (error) {
        console.error('Cannot get the profile info:', error);
        throw error;
    }
};

