import { useState } from "react";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import CardColumn from "../Column";
import { ColumnType } from "../Column";
import ColumnDropZone from "../ColumnDropZone";
import AddColumnModal from "../AddColumnModal";

const ARCHIVE_IND = 0;

enum TaskStatus {
    OPEN,
    CLOSED,
}

const KanbanBoard = () => {
    const [board, setBoard] = useState<ColumnType[]>([
        {
            id: -1,
            name: "Archive",
            cards: [],
        },

        {
            id: 0,
            name: "Tasks",
            cards: [
                {
                    name: "task1",
                    description: "finish task1",
                    createdAt: "May 4th",
                    status: TaskStatus.OPEN,
                },
                {
                    name: "task2",
                    description: "Do task 2",
                    createdAt: "May 4th",
                    status: TaskStatus.OPEN,
                },
                {
                    name: "task3",
                    description: "The last task here",
                    createdAt: "May 4th",
                    status: TaskStatus.OPEN,
                },
            ],
        },
        {
            id: 1,
            name: "Todo",
            cards: [
                {
                    name: "task4",
                    description: "finish task4",
                    createdAt: "May 4th",
                    status: TaskStatus.OPEN,
                },
            ],
        },
        {
            id: 2,
            name: "Complete",
            cards: [],
        },
    ]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const addColumn = (name: string) => {
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));
        deepBoardCopy.push({
            id: Math.floor(Math.random() * 10000000),
            cards: [],
            name,
        });

        setBoard(deepBoardCopy);
        onClose();
    };

    return (
        <Flex width="100vw" height="95vh" mt="4.5vh">
            <AddColumnModal isOpen={isOpen} onClose={onClose} addColumn={addColumn} />

            <Flex justifyContent="space-between" width="100%" height="100%">
                <Flex flex={8} maxWidth="80%" overflowX="auto">
                    {board.map((column, columnInd) => (
                        <Flex display={column.id === -1 ? "none" : "flex"} key={column.id}>
                            <ColumnDropZone columnInd={columnInd} board={board} setBoard={setBoard} />
                            <CardColumn columnInd={columnInd} board={board} setBoard={setBoard} />
                        </Flex>
                    ))}
                    <ColumnDropZone columnInd={board.length} board={board} setBoard={setBoard} />
                    <Button margin="60px" minWidth="100px" height="40px" onClick={onOpen} backgroundColor="red.300">
                        Add column
                    </Button>
                </Flex>

                <Flex flex={2}>
                    <CardColumn columnInd={ARCHIVE_IND} board={board} setBoard={setBoard} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export { TaskStatus };
export default KanbanBoard;
