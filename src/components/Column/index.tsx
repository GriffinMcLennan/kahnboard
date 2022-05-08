import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import Card, { CardType } from "../Card";
import CardDropZone from "../CardDropZone";
import UpdateColumnModal from "../UpdateColumnModal.tsx";

interface ColumnProps {
    columnInd: number;
    board: ColumnType[];
    setBoard: Dispatch<SetStateAction<ColumnType[]>>;
}

interface ColumnType {
    id: number;
    title: string;
    date: string;
    cards: CardType[];
}

const CardColumn: React.FC<ColumnProps> = ({ columnInd, board, setBoard }) => {
    const [title, setTitle] = useState("");
    const { isOpen, onClose, onOpen } = useDisclosure();
    const columnData: ColumnType = board[columnInd];

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "column",
            item: {
                title: columnData.title,
                date: columnData.date,
                columnInd,
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [columnInd, board]
    );

    const updateColumn = () => {
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));
        deepBoardCopy[columnInd].title = title;
        setBoard(deepBoardCopy);
        onClose();
    };

    useEffect(() => {
        setTitle(columnData.title);
    }, [columnData]);

    return (
        <>
            <UpdateColumnModal
                isOpen={isOpen}
                onClose={onClose}
                setTitle={setTitle}
                title={title}
                updateColumn={updateColumn}
            />
            <Flex
                flexDirection="column"
                alignItems="center"
                width="250px"
                border="1px solid black"
                borderRadius="6px"
                height="90vh"
                ref={drag}
                opacity={isDragging ? 0 : 1}
            >
                <Text fontSize="18px" fontWeight="600">
                    {columnData.title}
                </Text>

                <Flex alignItems="center" justifyContent="space-between" width="80%">
                    <Text>{columnData.date}</Text>
                    <Button width="30px" height="30px" onClick={() => onOpen()}>
                        Edit
                    </Button>
                </Flex>

                {board[columnInd].cards.map((card, cardInd) => (
                    <React.Fragment key={cardInd}>
                        <CardDropZone board={board} setBoard={setBoard} columnInd={columnInd} cardInd={cardInd} />
                        <Card
                            key={card.description}
                            columnInd={columnInd}
                            cardInd={cardInd}
                            board={board}
                            setBoard={setBoard}
                        />
                    </React.Fragment>
                ))}
                <CardDropZone
                    board={board}
                    setBoard={setBoard}
                    columnInd={columnInd}
                    cardInd={board[columnInd].cards.length}
                    isLast
                />
            </Flex>
        </>
    );
};

export type { ColumnType };
export default CardColumn;
