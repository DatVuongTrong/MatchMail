'use client';

import { Input, Button, Card, CardBody, Spacer, CardHeader, CardFooter } from "@nextui-org/react";
import { useState, useCallback } from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const isEmpty = (value: string) => value === "";

    const handleLogin = useCallback(
        async () => {
            const result = await loginUser({ username, password });
            if (result) {
                const { ok, data }: { ok: boolean, data: any } = result;
                if (ok) {
                    router.replace("/dashboard");
                } else {
                    setInvalidCredentials(true);
                }
            } else {
                setInvalidCredentials(true);
            }
        },
        [router, invalidCredentials, username, password]
    );

    const handleUsernameInput = useCallback(
        async (usernameInput: string) => {
            setUsername(usernameInput);
            setInvalidCredentials(false);
        },
        [username, invalidCredentials]
    );

    const handlePasswordInput = useCallback(
        async (passwordInput: string) => {
            setPassword(passwordInput);
            setInvalidCredentials(false);
        },
        [password, invalidCredentials]
    );


    return (
        <Card className="py-4 dark w-[400px] h-auto border border-coolGray-700">
            <CardHeader className="justify-between pb-0 pt-2 px-4 flex-col">
                <div className="font-bold text-xl">Welcome ✌️</div>
            </CardHeader>
            <CardBody className="flex w-full flex-wrap flex-col md:mb-0 gap-4 py-8 px-8">
                <Input
                    key="username"
                    variant='bordered'
                    type='username'
                    label='Username'
                    value={username}
                    isInvalid={invalidCredentials}
                    color={invalidCredentials ? "danger" : "default"}
                    errorMessage="Invalid username or password"
                    onValueChange={handleUsernameInput}
                />
                <Input
                    key="password"
                    variant='bordered'
                    label='Password'
                    type='password'
                    value={password}
                    isInvalid={invalidCredentials}
                    color={invalidCredentials ? "danger" : "default"}
                    errorMessage="Invalid email or password"
                    onValueChange={handlePasswordInput}
                />
                <Button
                    color="primary"
                    type='submit'
                    className=" w-full bg-gradient-to-r from-violet-600 to-indigo-600"
                    isDisabled={isEmpty(username) || isEmpty(password)}
                    onClick={handleLogin}
                >
                    Continue
                </Button>
                <div className='text-sm'>
                    Need to create an account?{" "}<Link href='signup' className='bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent'>
                        Sign up
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
}
