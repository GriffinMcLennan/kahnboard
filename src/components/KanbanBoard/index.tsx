import { useState } from "react";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import CardColumn from "../Column";
import { ColumnType } from "../Column";
import ColumnDropZone from "../ColumnDropZone";
import AddColumnModal from "../AddColumnModal";

const KanbanBoard = () => {
    const [board, setBoard] = useState<ColumnType[]>([
        {
            id: 0,
            title: "Tasks",
            date: "May 7",
            cards: [
                {
                    name: "task1",
                    description: "finish task1",
                    status: false,
                },
                {
                    name: "task2",
                    description: "Do task 2",
                    status: false,
                },
                {
                    name: "task3",
                    description: "The last task here",
                    status: false,
                },
            ],
        },
        {
            id: 1,
            title: "Todo",
            date: "May 6",
            cards: [
                {
                    name: "task4",
                    description: "finish task4",
                    status: false,
                },
            ],
        },
        {
            id: 2,
            title: "Complete",
            date: "April",
            cards: [],
        },
    ]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const addColumn = (title: string) => {
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));
        deepBoardCopy.push({
            id: Math.floor(Math.random() * 10000000),
            cards: [],
            date: "nil",
            title,
        });

        setBoard(deepBoardCopy);
        onClose();
    };

    return (
        <Flex width="100vw" height="20vh" mt="20px">
            <AddColumnModal isOpen={isOpen} onClose={onClose} addColumn={addColumn} />
            {board.map((column, columnInd) => (
                <Flex key={column.id}>
                    <ColumnDropZone columnInd={columnInd} board={board} setBoard={setBoard} />
                    <CardColumn columnInd={columnInd} board={board} setBoard={setBoard} />
                </Flex>
            ))}

            <ColumnDropZone columnInd={board.length} board={board} setBoard={setBoard} />
            <Button margin="20px" onClick={onOpen}>
                Add column
            </Button>
        </Flex>
    );
};

export default KanbanBoard;
