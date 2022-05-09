import { useState } from "react";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import CardColumn from "../Column";
import ColumnDropZone from "../ColumnDropZone";
import AddColumnModal from "../AddColumnModal";
import { ColumnType, TaskStatus } from "../../types/board";

const ARCHIVE_IND = 0;
const ARCHIVE_ID = "-1";

const KanbanBoard = () => {
    const [board, setBoard] = useState<ColumnType[]>([
        {
            id: "-1",
            order: 0,
            name: "Archive",
            cards: [
                {
                    name: "Eat Lunch",
                    description: "Don't forget to eat lunch!",
                    createdAt: "8/4/2022",
                    status: TaskStatus.OPEN,
                    order: 0,
                    key: uuidv4(),
                },
            ],
        },

        {
            id: uuidv4(),
            order: 1,
            name: "Tasks",
            cards: [
                {
                    name: "Visit Store",
                    description: "Buy food",
                    createdAt: "8/4/2022",
                    status: TaskStatus.OPEN,
                    order: 0,
                    key: uuidv4(),
                },
                {
                    name: "Visit Dentist",
                    description: "Get teeth cleaned",
                    createdAt: "3/10/2022",
                    status: TaskStatus.OPEN,
                    order: 1,
                    key: uuidv4(),
                },
            ],
        },
        {
            id: uuidv4(),
            order: 2,
            name: "Todo",
            cards: [
                {
                    name: "Drink water",
                    description: "Drink some water daily",
                    createdAt: "10/10/2010",
                    status: TaskStatus.OPEN,
                    order: 0,
                    key: uuidv4(),
                },
            ],
        },
        {
            id: uuidv4(),
            order: 3,
            name: "Complete",
            cards: [
                {
                    name: "Code kanban board",
                    description: "Create a kanban board github repository",
                    createdAt: "4/6/2010",
                    status: TaskStatus.CLOSED,
                    order: 2,
                    key: uuidv4(),
                },
            ],
        },
    ]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const addColumn = (name: string) => {
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));
        deepBoardCopy.push({
            id: uuidv4(),
            cards: [],
            name,
            order: deepBoardCopy.length,
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
                        <Flex display={column.id === ARCHIVE_ID ? "none" : "flex"} key={column.id}>
                            <ColumnDropZone columnInd={columnInd} board={board} setBoard={setBoard} />
                            <CardColumn columnInd={columnInd} board={board} setBoard={setBoard} />
                        </Flex>
                    ))}
                    <ColumnDropZone columnInd={board.length} board={board} setBoard={setBoard} />
                </Flex>

                <Button margin="50px" minWidth="100px" height="40px" onClick={onOpen} backgroundColor="red.300">
                    Add column
                </Button>

                <Flex flex={2} justifyContent="center">
                    <CardColumn columnInd={ARCHIVE_IND} board={board} setBoard={setBoard} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export { TaskStatus };
export default KanbanBoard;
