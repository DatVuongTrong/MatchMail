'use client';

import { renewToken } from "@/services/auth";
import { Button } from "@nextui-org/react";
export default function Dashboard() {
    const handleButtonClick = async () => {
        const result = await renewToken();
        if (result) {
            const { ok, data }: { ok: boolean, data: any } = result;
            console.log(data);
            if (ok) {
                console.log("successful renew");
            } else {
                console.log("error");
            }
        }
    };
    return (
        <div>
            <Button onClick={handleButtonClick} />
        </div>
    );
}