import {
    Flex,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    Textarea,
    Switch,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { ColumnType } from "../Column";
import UpdateCardModal from "../UpdateCardModal";

interface CardProps {
    board: ColumnType[];
    setBoard: Dispatch<SetStateAction<ColumnType[]>>;
    columnInd: number;
    cardInd: number;
}

interface CardType {
    name: string;
    description: string;
    status: boolean;
}

const Card = ({ board, setBoard, columnInd, cardInd }: CardProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);

    const cardData = board[columnInd].cards[cardInd];

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "card",
            item: {
                columnInd,
                cardInd,
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [columnInd, cardInd, board]
    );

    useEffect(() => {
        setName(cardData.name);
        setDescription(cardData.description);
        setStatus(cardData.status);
    }, [cardData]);

    const updateCard = () => {
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));
        deepBoardCopy[columnInd].cards[cardInd].name = name;
        deepBoardCopy[columnInd].cards[cardInd].description = description;
        deepBoardCopy[columnInd].cards[cardInd].status = status;
        setBoard(deepBoardCopy);
        onClose();
    };

    return (
        <>
            <UpdateCardModal
                isOpen={isOpen}
                onClose={onClose}
                description={description}
                name={name}
                setDescription={setDescription}
                setName={setName}
                setStatus={setStatus}
                status={status}
                updateCard={updateCard}
            />
            <Flex
                ref={drag}
                flexDirection="column"
                border="1px solid gray"
                borderRadius="6px"
                width="220px"
                alignItems="center"
                opacity={isDragging ? 0 : 1}
            >
                <Text>{cardData.name}</Text>
                <Text>{cardData.description}</Text>
                <Text>{cardData.status ? "Closed" : "Open"}</Text>
                <Button onClick={onOpen}>Edit</Button>
            </Flex>
        </>
    );
};

export type { CardType };
export default Card;
