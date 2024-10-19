'use client';

import { Card, CardHeader, CardBody, Image, Avatar, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { LinkIcon, NameIcon, EmailIcon, PhoneIcon, EditIcon, EyeIcon } from "@/components/icons";
import { CldUploadWidget, CldOgImage, CldImage } from 'next-cloudinary';
import { useState, useCallback, useEffect } from "react";
import { getProfile } from "@/services/profile";
import Link from "next/link";

type ProfileProps = {
    profile_name: string | undefined;
    full_name: string | undefined;
    job_title: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    resume_public_id: string | undefined;
    resume_title: string | undefined;
    avatar_url: string | undefined;
    linkedIn: string | undefined;
}

export default function Profile() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [profileInfo, setProfileInfo] = useState<ProfileProps>({
        profile_name: "Dat Vuong",
        full_name: "Dat Trong Vuong",
        job_title: "Software Engineer",
        email: "trongdatvuong@gmail.com",
        phone: "765-712-2967",
        resume_public_id: "qcasiz78l1bz0tb89ylf",
        resume_title: "Dat_Vuong_Resume.pdf",
        avatar_url: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        linkedIn: "https://www.linkedin.com/in/dat-vuong/",
    });

    const queryProfile = useCallback(
        async () => {
            const result = await getProfile();
            if (result) {
                const { ok, data }: { ok: boolean, data: any } = result;
                if (ok) {
                    const newProfileInfo = {
                        profile_name: data.profile_name,
                        full_name: data.full_name,
                        job_title: data.job_title,
                        email: data.email,
                        phone: data.phone,
                        resume_public_id: data.resume_public_id,
                        resume_title: data.resume_title,
                        avatar_url: data.avatar_url,
                        linkedIn: data.linkedIn
                    }
                    setProfileInfo(newProfileInfo);
                }
            }
        },
        [profileInfo]
    );

    useEffect(() => {
        queryProfile();
    }, [queryProfile]);

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
                            src={profileInfo.avatar_url}
                        />
                    </div>
                    <p className="font-bold text-xl">{profileInfo.profile_name}</p>
                    <p className="text-sm">{profileInfo.job_title}</p>
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
                            <p key="fullName" className="text-md">{profileInfo.full_name}</p>
                        </div>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <EmailIcon height={20} width={20} />
                            <p key="fullName" className="text-md">{profileInfo.email}</p>
                        </div>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <PhoneIcon height={20} width={20} />
                            <p key="fullName" className="text-md">{profileInfo.phone}</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
                <Card className=" px-8 py-8 flex-col justify-center dark">
                    <CardHeader className="px-0 flex-row justify-between">
                        <p className="font-bold text-xl">Resume</p>
                        <Button isIconOnly aria-label="Edit" variant="light" >
                            <EditIcon height={20} width={20} />
                        </Button>
                    </CardHeader>
                    <Divider />
                    <CldOgImage src={profileInfo.resume_public_id ?? ""} alt="Resume" />
                    <CardBody className="px-0 flex-col items-start">
                        {profileInfo.resume_public_id !== "" ?
                            <div className="flex flex-row gap-4 justify-center items-center">
                                <Button color="primary" onPress={onOpen}>
                                    <EyeIcon height={20} width={20} /> Preview
                                </Button>
                                <p key="fullName" className="text-md">{profileInfo.resume_title}</p>
                                <Modal scrollBehavior="inside" size="5xl" backdrop="blur" isOpen={isOpen} onClose={onClose} className="dark">
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">{[profileInfo.resume_title]}</ModalHeader>
                                                <ModalBody>
                                                    <CldImage width="960" height="600" src={profileInfo.resume_public_id ?? ""} alt="Resume" />
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>

                            :
                            <CldUploadWidget signatureEndpoint="/api/upload"
                                onSuccess={(result) => console.log(result)}
                            >
                                {({ open }) => {
                                    return (
                                        <Button onClick={() => open()}>
                                            Upload Resume
                                        </Button>
                                    );
                                }
                                }
                            </CldUploadWidget>}
                    </CardBody>
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
                            <Link href={profileInfo.linkedIn ?? ""}><p key="LinkedIn" className="text-md">{profileInfo.linkedIn}</p></Link>
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

        </div >
    );
}