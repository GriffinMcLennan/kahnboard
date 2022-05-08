import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import AddCardModal from "../AddCardModal";
import AddColumnModal from "../AddColumnModal";
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

const ARCHIVE_BOARD = -1;

const CardColumn: React.FC<ColumnProps> = ({ columnInd, board, setBoard }) => {
    const [title, setTitle] = useState("");
    const { isOpen: updateIsOpen, onClose: updateOnClose, onOpen: updateOnOpen } = useDisclosure();
    const { isOpen: addIsOpen, onClose: addOnClose, onOpen: addOnOpen } = useDisclosure();

    const columnData: ColumnType = board[columnInd];

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "column",
            item: {
                title: columnData.title,
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
        updateOnClose();
    };

    const deleteColumn = () => {
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));
        const removedColumnBoard = [
            ...deepBoardCopy.slice(0, columnInd),
            ...deepBoardCopy.slice(columnInd + 1, deepBoardCopy.length),
        ];

        setBoard(removedColumnBoard);
    };

    const addCard = (name: string, description: string) => {
        const date = new Date();
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));
        deepBoardCopy[columnInd].cards.push({
            name,
            description,
            status: false,
        });

        setBoard(deepBoardCopy);
        addOnClose();
    };

    useEffect(() => {
        setTitle(columnData.title);
    }, [columnData]);

    return (
        <>
            <AddCardModal isOpen={addIsOpen} onClose={addOnClose} addCard={addCard} />
            <UpdateColumnModal
                isOpen={updateIsOpen}
                onClose={updateOnClose}
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
                <Flex alignItems="center" justifyContent="space-between" width="90%" mt="5px">
                    <Text fontSize="18px" fontWeight="600">
                        {columnData.title}
                    </Text>

                    <Button width="30px" height="30px" onClick={() => updateOnOpen()}>
                        Edit
                    </Button>

                    {columnData.cards.length === 0 && columnData.id !== ARCHIVE_BOARD && (
                        <Button width="30px" height="30px" onClick={deleteColumn}>
                            Del
                        </Button>
                    )}
                </Flex>

                <Button mt="15px" backgroundColor="blue.300" onClick={addOnOpen}>
                    Add card
                </Button>

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
