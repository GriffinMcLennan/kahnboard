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
    Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

interface AddCardModalProps {
    isOpen: boolean;
    onClose: any;
    addCard: any;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, addCard }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Card</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex alignItems="center">
                        <Text width="120px" mr="5px">
                            Name:
                        </Text>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </Flex>
                    <Flex alignItems="center" mt="10px">
                        <Text width="120px" mr="5px">
                            Description:
                        </Text>
                        <Textarea onChange={(e) => setDescription(e.target.value)} />
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => addCard(name, description)}>Add Card</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddCardModal;
