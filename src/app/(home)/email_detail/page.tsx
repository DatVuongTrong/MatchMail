import React, { useState, useCallback } from 'react';
import { Tabs, Tab, Button, Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { createEmail, getEmails } from "@/services/email";



type Email = {
    subject: string;
    title: string;
    content: string;
    email_address: string;
    recruiter_name: string;
};

export const EmailDetailModal = (isOpen: boolean, onOpenChange: VoidFunction, onClose: VoidFunction, email: Email, isEdit: boolean = false) => {
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [emailContent, setEmailContent] = useState(email.content);
    const [emailSubject, setEmailSubject] = useState(email.subject);

    

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

            if (emailData) {
                if (emailData.ok) {
                    console.log("Email saved successfully");
                    toast.success("Email saved successfully");
                    router.replace("/database");
                }
            } else {
                console.error("Error saving email");
                toast.error("Error saving email");
            }
            setIsProcessing(false);


        },
        [emailSubject, emailContent]
    );

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark" size="5xl" scrollBehavior="inside">
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
                                disabled={!isEdit}
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
                                disabled={!isEdit}
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
    );
};