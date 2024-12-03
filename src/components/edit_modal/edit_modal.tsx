'use client';

import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


type dataType = {
    label: string,
    value: string
}

export const EditModal = (title: string, data: dataType[], isOpen: boolean, onClose: () => void) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Edit Data</ModalHeader>
                <ModalBody>
                    {data.map((item: dataType) => (
                        <Input
                            label={item.label}
                            defaultValue={item.value}
                        />
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}