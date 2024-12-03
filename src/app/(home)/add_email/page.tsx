'use client';

import { Tabs, Tab, Button, Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { generateEmail } from "@/services/email";
import Typewriter from 'typewriter-effect';
import { createEmail } from "@/services/email";
import toast, { Toaster } from 'react-hot-toast';

export default function AddEmail() {
    const router = useRouter();
    const createModal = useDisclosure();
    const editModal = useDisclosure();


    const [linkedInURL, setLinkedInURL] = useState("");
    const [jobDescription, setjobDescription] = useState("");
    const [content, setContent] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [emailContent, setEmailContent] = useState("");
    const [emailSubject, setEmailSubject] = useState("");

    const handleSubmit = useCallback(
        async () => {
            setIsProcessing(true);
            const result = await generateEmail({
                linkedin_url: linkedInURL,
                job_description: jobDescription
            });

            if (result) {
                const { ok, data }: { ok: boolean, data: any } = result;
                if (ok) {
                    const dataSplit = data.email.split("\n");
                    const subject = dataSplit[0];
                    const emailContentSplit = dataSplit.slice(2);

                    setEmailSubject(subject);
                    setContent(emailContentSplit);
                    setEmailContent(emailContentSplit.join("\n"));

                    createModal.onOpen()
                }
                else {
                    toast.error("Error generating email");
                }
            }


            setIsProcessing(false);
        },
        [linkedInURL, jobDescription]
    );


    const handleEdit = useCallback(
        async () => {
            createModal.onClose();
            editModal.onOpen();
        },
        []
    );

    const handleSave = useCallback(
        async () => {
            setIsProcessing(true);
            console.log({
                subject: emailSubject,
                content: emailContent,
                title: "Job application to Meta",
                email_address: "davidvuongcs@gmail.com"
            });
            const emailData = await createEmail({
                subject: emailSubject,
                content: emailContent,
                title: "Job application to Meta",
                email_address: "davidvuongcs@gmail.com"
            })


            if (emailData && emailData.ok) {
                console.log("Email saved successfully");
                toast.success("Email saved successfully");
                router.replace("/database");
            } else {
                console.error("Error saving email");
                toast.error("Error saving email");
            }
            setIsProcessing(false);


        },
        [emailSubject, emailContent]
    );

    return (
        <div className="h-full w-full dark flex-col flex gap-4 items-center px-8">
            <Toaster />
            <Tabs color="primary" aria-label="Options" className="dark mt-16" radius="full" size="lg"
                classNames={{
                    cursor: "w-full bg-gradient-to-r from-violet-600 to-indigo-600",
                    tab: "max-w-fit p-6",
                }}
            >
                <Tab key="recruiter" className="flex-col flex items-center w-full"
                    title={
                        <div className="flex items-center">
                            <span>Recruiter Profile</span>
                        </div>
                    }>
                    <Input
                        variant="bordered"
                        className="max-w-xl h-64"
                        key="LinkedInURL"
                        type="text"
                        placeholder="Recruiter's LinkedIn URL"
                        value={linkedInURL}
                        onValueChange={setLinkedInURL}
                    />

                </Tab>
                <Tab key="job-description" className="flex-col flex items-center w-full"
                    title={
                        <div className="flex items-center">
                            <span>Job Description</span>
                        </div>
                    }>
                    <Textarea
                        variant="bordered"
                        placeholder="Enter your description"
                        className="max-w-xl h-64"
                        value={jobDescription}
                        onValueChange={setjobDescription}
                    />
                </Tab>
            </Tabs>
            <Button
                radius="full"
                type='submit'
                className="w-32 p-6 bg-gradient-to-r from-violet-600 to-indigo-600"
                onClick={handleSubmit}
                isLoading={isProcessing}
            >
                Submit
            </Button>
            <Modal isOpen={createModal.isOpen} onOpenChange={createModal.onOpenChange} className="dark" size="5xl" scrollBehavior="inside">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{emailSubject}</ModalHeader>
                            <ModalBody className="flex flex-col gap-1">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        content.map((line: string) => {
                                            typewriter.typeString(`<p>${line}</p>`).typeString('<br />').changeDelay(Math.random() < 0.5 ? 1 : -1).start();
                                        })
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" onPress={handleEdit}>
                                    Edit
                                </Button>
                                <Button isLoading={isProcessing} color="primary" onPress={handleSave}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={editModal.isOpen} onOpenChange={editModal.onOpenChange} className="dark" size="5xl" scrollBehavior="inside">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <Input
                                    defaultValue={emailSubject}
                                    className="w-full h-full"
                                    value={emailSubject}
                                    onValueChange={setEmailSubject}
                                    variant="underlined"
                                />
                            </ModalHeader>
                            <ModalBody className="flex flex-col">
                                <Textarea
                                    variant="bordered"
                                    className="w-full h-full"
                                    defaultValue={emailContent}
                                    value={emailContent}
                                    maxRows={30}
                                    onValueChange={setEmailContent}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button isLoading={isProcessing} color="primary" onPress={handleSave}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    );
}