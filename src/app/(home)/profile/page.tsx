'use client';

import { Card, CardHeader, CardBody, Image, Avatar, Divider, Button } from "@nextui-org/react";
import { LinkIcon, NameIcon, EmailIcon, PhoneIcon, EditIcon } from "@/components/icons";
import { CldUploadWidget } from 'next-cloudinary';

export default function Profile() {
    return (
        <div className="h-full dark flex-row flex gap-4 justify-center px-8">
            <div className="w-1/4 flex flex-col gap-4">
                <Card className=" px-8 py-16 flex-col justify-center items-center bg-gradient-to-r from-violet-500 to-indigo-500">
                    <CardHeader className="px-0 justify-end">
                        <Button isIconOnly aria-label="Edit" variant="light">
                            <EditIcon height={20} width={20} />
                        </Button>
                    </CardHeader>
                    <div className="pb-4">
                        <Avatar
                            className="w-30 h-30"
                            name="Jason Hughes"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </div>
                    <p className="font-bold text-xl">Dat Vuong</p>
                    <p className="text-sm">Software Engineer</p>
                </Card>
                <Card className=" px-8 py-8 flex-col justify-center dark">
                    <CardHeader className="px-0 flex-row justify-between">
                        <p className="font-bold text-xl">Contact</p>
                        <Button isIconOnly aria-label="Edit" variant="light">
                            <EditIcon height={20} width={20} />
                        </Button>
                    </CardHeader>
                    <Divider />
                    <CardBody className="px-0 flex-col items-start">
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <NameIcon height={20} width={20} />
                            <p key="fullName" className="text-md">Dat Vuong Trong</p>
                        </div>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <EmailIcon height={20} width={20} />
                            <p key="fullName" className="text-md">trongdatvuong@gmail.com</p>
                        </div>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <PhoneIcon height={20} width={20} />
                            <p key="fullName" className="text-md">765-712-2967</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
                <Card className=" px-8 py-8 flex-col justify-center dark">
                    <CardHeader className="px-0 flex-row justify-between">
                        <p className="font-bold text-xl">Resume</p>
                        <Button isIconOnly aria-label="Edit" variant="light">
                            <EditIcon height={20} width={20} />
                        </Button>
                    </CardHeader>
                    <Divider />
                    <CldUploadWidget signatureEndpoint="/api/upload">
                        {({ open }) => {
                            return (
                                <Button onClick={() => open()}>
                                    Upload an Image
                                </Button>
                            );
                        }}
                    </CldUploadWidget>
                </Card>
                <Card className=" px-8 py-8 flex-col justify-center dark">
                    <CardHeader className="px-0 flex-row justify-between">
                        <p className="font-bold text-xl">LinkedIn</p>
                        <Button isIconOnly aria-label="Edit" variant="light">
                            <EditIcon height={20} width={20} />
                        </Button>
                    </CardHeader>
                    <Divider />
                    <CardBody className="px-0 flex-col items-start ">
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <LinkIcon height={20} width={20} />
                            <p key="LinkedIn" className="text-md">https://www.linkedin.com/in/dat-vuong/</p>
                        </div>
                    </CardBody>
                </Card>
                <Card className="h-auto py-0">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                        <p className="text-tiny uppercase font-bold">Daily Mix</p>
                        <small className="text-default-500">12 Tracks</small>
                        <h4 className="font-bold text-large">Frontend Radio</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            width={270}
                        />
                    </CardBody>
                </Card>
            </div>

        </div>
    );
}