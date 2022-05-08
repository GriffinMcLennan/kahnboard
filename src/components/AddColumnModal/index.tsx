import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface AddColumnModalProps {
    isOpen: boolean;
    onClose: any;
    addColumn: any;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({ isOpen, onClose, addColumn }) => {
    const [name, setName] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Column</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex alignItems="center">
                        <Text width="120px" mr="5px">
                            Name:
                        </Text>
                        <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button
                        onClick={() => {
                            addColumn(name);
                            setName("");
                        }}
                    >
                        Add Column
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddColumnModal;
