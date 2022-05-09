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

interface UpdateColumnModalProps {
    isOpen: boolean;
    onClose: any;
    name: string;
    setName: (e: string) => void;
    updateColumn: () => void;
}

const UpdateColumnModal: React.FC<UpdateColumnModalProps> = ({ isOpen, onClose, name, setName, updateColumn }) => {
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
                        <Input value={name} autoFocus onChange={(e) => setName(e.target.value)} />
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
