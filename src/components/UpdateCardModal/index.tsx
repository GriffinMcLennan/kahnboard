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
import { TaskStatus } from "../KanbanBoard";

interface UpdateCardModalProps {
    isOpen: boolean;
    onClose: any;
    name: string;
    setName: (e: string) => void;
    description: string;
    setDescription: (e: string) => void;
    status: TaskStatus;
    setStatus: any;
    updateCard: () => void;
}

const UpdateCardModal: React.FC<UpdateCardModalProps> = ({
    isOpen,
    onClose,
    name,
    setName,
    description,
    setDescription,
    status,
    setStatus,
    updateCard,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Card</ModalHeader>
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
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Flex>

                    <Flex alignItems="center" mt="10px">
                        <Text width="90px" mr="5px">
                            Status:
                        </Text>
                        <Switch
                            isChecked={status === TaskStatus.CLOSED}
                            onChange={(e) => setStatus((b: boolean) => !b)}
                        />
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={updateCard}>Save Card</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdateCardModal;
