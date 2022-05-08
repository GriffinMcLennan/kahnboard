import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../Card";
import CardColumn from "../Column";
import { ColumnType } from "../Column";
import ColumnDropZone from "../ColumnDropZone";

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

    return (
        <Flex width="100vw" height="20vh">
            {board.map((column, columnInd) => (
                <Flex key={column.id}>
                    <ColumnDropZone columnInd={columnInd} board={board} setBoard={setBoard} />
                    <CardColumn {...column} columnInd={columnInd} board={board} setBoard={setBoard} />
                </Flex>
            ))}

            <ColumnDropZone columnInd={board.length} board={board} setBoard={setBoard} />
        </Flex>
    );
};

export default KanbanBoard;
