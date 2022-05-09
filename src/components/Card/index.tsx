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
import { TaskStatus } from "../KanbanBoard";

interface CardProps {
    board: ColumnType[];
    setBoard: Dispatch<SetStateAction<ColumnType[]>>;
    columnInd: number;
    cardInd: number;
}

interface CardType {
    name: string;
    description: string;
    status: TaskStatus;
}

const ARCHIVE_IND = 0;

const Card = ({ board, setBoard, columnInd, cardInd }: CardProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.OPEN);

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

    const archive = () => {
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));

        // grab the current card
        const curCard = deepBoardCopy[columnInd].cards[cardInd];

        // remove the card from the current column
        deepBoardCopy[columnInd].cards = [
            ...deepBoardCopy[columnInd].cards.slice(0, cardInd),
            ...deepBoardCopy[columnInd].cards.slice(cardInd + 1, deepBoardCopy[columnInd].cards.length),
        ];

        // move the card to the archive
        deepBoardCopy[0].cards.push(curCard);

        setBoard(deepBoardCopy);
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
                padding="5px"
                backgroundColor="yellow.50"
            >
                <Text>{cardData.name}</Text>
                <Text>{cardData.description}</Text>
                <Text>Status: {cardData.status ? "Closed" : "Open"}</Text>
                <Flex display={columnInd === ARCHIVE_IND ? "none" : "flex"} justifyContent="space-between" width="90%">
                    <Button onClick={onOpen}>Edit</Button>
                    <Button onClick={archive}>Archive</Button>
                </Flex>
            </Flex>
        </>
    );
};

export type { CardType };
export default Card;
