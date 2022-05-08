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
    Switch,
    Textarea,
    Text,
} from "@chakra-ui/react";

interface UpdateColumnModalProps {
    isOpen: boolean;
    onClose: any;
    title: string;
    setTitle: (e: string) => void;
    updateColumn: () => void;
}

const UpdateColumnModal: React.FC<UpdateColumnModalProps> = ({ isOpen, onClose, title, setTitle, updateColumn }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Column</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex alignItems="center">
                        <Text width="120px" mr="5px">
                            Name:
                        </Text>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={updateColumn}>Save Column</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdateColumnModal;
