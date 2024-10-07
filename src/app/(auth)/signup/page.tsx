'use client';

import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import React, { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/services/auth";

export default function SignUpPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isEmpty = (value: string) => value === "";

    const isInvalidEmail = useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    const isInvalidConfirmedPassword = useMemo(() => {
        if (confirmedPassword === "") return false;

        return confirmedPassword !== password;
    }, [confirmedPassword, password]);


    const handleSignup = useCallback(
        async () => {

            const result = await createUser({ username, password, email, fullName });
            if (result) {
                const { ok, data }: { ok: boolean, data: any } = result;
                console.log(data);
                if (ok) {
                    console.log("successful signup");
                } else {
                    console.log("error");
                }
            } else {
                console.log("error");
            }
        },
        [router, username, password, email, fullName]
    );

    return (
        <Card className="py-4 dark w-[400px] h-auto border border-coolGray-700">
            <CardHeader className="justify-between pb-0 pt-2 px-4 flex-col">
                <div className="font-bold text-xl">Signup ✌️</div>
            </CardHeader>
            <CardBody className="flex w-full flex-wrap flex-col md:mb-0 gap-4 py-8 px-8">
                <Input
                    key="username"
                    variant='bordered'
                    type='text'
                    label='Username'
                    value={username}
                    onValueChange={setUsername}
                />
                <Input
                    key="fullname"
                    variant='bordered'
                    type='text'
                    label='Full Name'
                    value={fullName}
                    onValueChange={setFullName}
                />
                <Input
                    key="email"
                    variant='bordered'
                    label='Email'
                    type='email'
                    isInvalid={isInvalidEmail}
                    color={isInvalidEmail ? "danger" : "default"}
                    errorMessage="Please enter a valid email"
                    value={email}
                    onValueChange={setEmail}
                />
                <Input
                    key="password"
                    variant='bordered'
                    label='Password'
                    type='password'
                    value={password}
                    onValueChange={setPassword}
                />
                <Input
                    key="confirmed password"
                    variant='bordered'
                    label='Confirm password'
                    type='password'
                    value={confirmedPassword}
                    isInvalid={isInvalidConfirmedPassword}
                    color={isInvalidConfirmedPassword ? "danger" : "default"}
                    errorMessage="Password does not match"
                    onValueChange={setConfirmedPassword}
                />
                <Button
                    onClick={handleSignup}
                    color="primary"
                    type='submit'
                    className=" w-full bg-gradient-to-r from-violet-600 to-indigo-600"
                    isDisabled={isInvalidEmail || isInvalidConfirmedPassword || isEmpty(email) || isEmpty(password) || isEmpty(confirmedPassword) || isEmpty(username) || isEmpty(fullName)}
                >
                    Signup
                </Button>
            </CardBody>
        </Card>
    );
}
