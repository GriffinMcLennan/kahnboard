import { useState } from "react";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import CardColumn from "../Column";
import { ColumnType } from "../Column";
import ColumnDropZone from "../ColumnDropZone";
import AddColumnModal from "../AddColumnModal";

const ARCHIVE_IND = 0;

const KanbanBoard = () => {
    const [board, setBoard] = useState<ColumnType[]>([
        {
            id: -1,
            title: "Archive",
            date: "",
            cards: [],
        },

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
        <Flex width="100vw" height="95vh" mt="4.5vh">
            <AddColumnModal isOpen={isOpen} onClose={onClose} addColumn={addColumn} />

            <Flex justifyContent="space-between" width="100%" height="100%">
                <Flex flex={8} maxWidth="80%" overflowX="scroll">
                    {board.map((column, columnInd) => (
                        <Flex display={column.id === -1 ? "none" : "flex"} key={column.id}>
                            <ColumnDropZone columnInd={columnInd} board={board} setBoard={setBoard} />
                            <CardColumn columnInd={columnInd} board={board} setBoard={setBoard} />
                        </Flex>
                    ))}
                    <ColumnDropZone columnInd={board.length} board={board} setBoard={setBoard} />
                    <Button margin="60px" minWidth="100px" height="40px" onClick={onOpen}>
                        Add column
                    </Button>
                </Flex>

                <Flex flex={2}>
                    <ColumnDropZone columnInd={ARCHIVE_IND} board={board} setBoard={setBoard} />
                    <CardColumn columnInd={ARCHIVE_IND} board={board} setBoard={setBoard} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default KanbanBoard;
