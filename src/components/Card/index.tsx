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
    createdAt: string;
    status: TaskStatus;
    order: number;
    key: string;
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

    const deleteCard = () => {
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));

        // remove the card from the current column
        deepBoardCopy[columnInd].cards = [
            ...deepBoardCopy[columnInd].cards.slice(0, cardInd),
            ...deepBoardCopy[columnInd].cards.slice(cardInd + 1, deepBoardCopy[columnInd].cards.length),
        ];

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
                <Text fontSize="18px" fontWeight="600">
                    {cardData.name}
                </Text>

                <Text fontSize="14px">{cardData.description}</Text>
                <Text fontSize="14px">Status: {cardData.status ? "Closed" : "Open"}</Text>
                <Text fontSize="14px">Created: {cardData.createdAt}</Text>
                <Flex display={columnInd === ARCHIVE_IND ? "none" : "flex"} justifyContent="space-between" width="90%">
                    <Button fontSize="12px" width="50px" onClick={onOpen}>
                        Edit
                    </Button>
                    <Button fontSize="12px" width="50px" onClick={deleteCard}>
                        Delete
                    </Button>
                    <Button fontSize="12px" width="50px" onClick={archive}>
                        Archive
                    </Button>
                </Flex>
            </Flex>
        </>
    );
};

export type { CardType };
export default Card;
