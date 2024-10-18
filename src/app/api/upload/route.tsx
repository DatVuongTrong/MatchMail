'use server';

import { v2 as cloudinary } from 'cloudinary';
import config from "@/app/config";
export async function POST(request: Request) {
    const body = (await request.json()) as { paramsToSign: Record<string, string> };
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(paramsToSign, config.CLOUDINARY_API_SECRET as string);

    return Response.json({ signature });

}