import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../Card";
import Column from "../Column";
import ColumnDropZone from "../ColumnDropZone";

interface Column {
    id: number;
    title: string;
    date: string;
    cards: Card[];
}

interface Card {
    title: string;
    description: string;
    status: boolean;
}

const KanbanBoard = () => {
    const [board, setBoard] = useState<Column[]>([
        {
            id: 0,
            title: "Tasks",
            date: "May 7",
            cards: [],
        },
        {
            id: 1,
            title: "Todo",
            date: "May 6",
            cards: [],
        },
        {
            id: 2,
            title: "Complete",
            date: "April",
            cards: [],
        },
    ]);

    return (
        <Flex width="100vw" height="100vh">
            {board.map((column, columnInd) => (
                <Flex key={column.id}>
                    <ColumnDropZone columnInd={columnInd} board={board} setBoard={setBoard} />
                    <Column {...column} columnInd={columnInd} />
                </Flex>
            ))}

            <ColumnDropZone columnInd={board.length} board={board} setBoard={setBoard} />
        </Flex>
    );
};

export type { Column };
export default KanbanBoard;
