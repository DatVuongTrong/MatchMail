'use client';

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    User,
    useDisclosure,
    Spinner,
    Button, Pagination, Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Switch
} from "@nextui-org/react";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { EditIcon, EyeIcon, TrashIcon, LockIcon } from "@/components/icons";
import { Tooltip } from "@nextui-org/react";
import { emails } from "./data";
import toast, { Toaster } from 'react-hot-toast';
import { createEmail, getEmails, updateEmail } from "@/services/email";


type Col = {
    key: string;
    label: string;
};

const columns: Col[] = [
    { key: "recruiter", label: "RECRUITER" },
    { key: "subject", label: "SUBJECT" },
    { key: "actions", label: "ACTIONS" }
]

type Email = {
    id: string;
    subject: string;
    title: string;
    content: string;
    email_address: string;
    recruiter_name: string;
};



export default function Database() {
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

    const [page, setPage] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [isQuerying, setIsQuerying] = useState(true);
    const [emailContent, setEmailContent] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailsData, setEmailsData] = useState<Email[]>([]);
    const [totalEmail, setTotalEmail] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedEmailId, setSelectedEmailId] = useState("");

    const pages = useMemo(() => Math.ceil(totalEmail / 10), [totalEmail]);

    const queryEmails = async () => {
        setIsQuerying(true);
        const result = await getEmails({ page: page, limit: 10 });

        if (result) {
            const { data, ok }: { data: any, ok: boolean } = result;
            if (ok === true && data.emails) {
                var temp: Email[] = [];
                data.emails.forEach((email: any) => {
                    temp.push({
                        id: email.id,
                        email_address: "cidnyework@meta.com",
                        content: email.content,
                        subject: email.subject,
                        title: email.title,
                        recruiter_name: "Cidnye Work"
                    });
                });

                setTotalEmail(data.total);
                setEmailsData(temp);
            }
        }
        setIsQuerying(false);
    };

    const handleSave = useCallback(
        async () => {
            setIsSaving(true);
            console.log({
                subject: emailSubject,
                content: emailContent,
                title: "Job application to Meta",
                email_address: "davidvuongcs@gmail.com"
            });
            const emailData = await updateEmail(selectedEmailId, {
                subject: emailSubject,
                content: emailContent,
            })

            if (emailData) {
                if (emailData.ok) {
                    console.log("Email saved successfully");
                    toast.success("Email saved successfully");
                    onClose();
                }
            } else {
                console.error("Error saving email");
                toast.error("Error saving email");
            }
            setIsSaving(false);


        },
        [emailSubject, emailContent]
    );

    const handleDetails = useCallback((emails: Email) => {
        setEmailSubject(emails.subject);
        setEmailContent(emails.content);
        setIsEdit(false);
        onOpen();
    }, [isEdit]);

    const handleEdit = useCallback((emails: Email) => {
        setEmailSubject(emails.subject);
        setEmailContent(emails.content);
        setIsEdit(true);
        setSelectedEmailId(emails.id);
        onOpen();
    }, [isEdit]);

    const renderCell = (email: Email, columnKey: string) => {
        switch (columnKey) {
            case "recruiter":
                return (
                    <User
                        description={email.email_address}
                        name={email.recruiter_name}
                    >
                        {email.email_address}
                    </User>)
            case "subject":
                return <span>{email.subject}</span>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2 dark">
                        <Tooltip color="primary" content="Details" className="dark">
                            <Button color="primary" isIconOnly variant="light" onClick={() => handleDetails(email)}>
                                <EyeIcon height={20} width={20} />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Edit" className="dark">
                            <Button isIconOnly variant="light" onClick={() => handleEdit(email)}>
                                <EditIcon height={20} width={20} />
                            </Button>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete" className="dark">
                            <Button isIconOnly color="danger" variant="light">
                                <TrashIcon height={20} width={20} />
                            </Button>
                        </Tooltip>
                    </div>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        queryEmails();
    }, [isSaving, page]);

    return (
        <div className="h-full w-full dark flex-col flex gap-4 items-center px-8">
            <Toaster />
            <Table className="dark h-full"
                removeWrapper
                bottomContent={
                    pages > 0 ? (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                variant="light"
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    ) : null
                }
            >
                <TableHeader>
                    {columns.map((column) =>
                        <TableColumn key={column.key} width={column.key === "actions" ? 40 : undefined} className="text-md">{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No Emails"} loadingContent={<Spinner color="secondary" size="lg" />} loadingState={isQuerying ? "loading" : "idle"}>
                    {
                        emailsData.map((email: Email) =>
                            <TableRow key={email.recruiter_name}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {renderCell(email, column.key)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
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
                                <Switch size="lg" isSelected={isEdit} onValueChange={setIsEdit} thumbIcon={({ isSelected, className }) =>
                                    isSelected ? (
                                        <EditIcon width={16} height={16} color="#000000" />
                                    ) : (
                                        <LockIcon width={16} height={16} color="#000000" />
                                    )
                                }
                                />
                                <Button isLoading={isSaving} color="primary" onPress={handleSave}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    );
}