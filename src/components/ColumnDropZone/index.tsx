import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useDrop } from "react-dnd";
import type { ColumnType } from "../Column";

interface ColumnDropZoneProps {
    columnInd: number;
    board: ColumnType[];
    setBoard: Dispatch<SetStateAction<ColumnType[]>>;
}

const ColumnDropZone = ({ columnInd, board, setBoard }: ColumnDropZoneProps) => {
    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: "column",

            drop: (item: any) => {
                handleColumnDrop(board, setBoard, columnInd, item.columnInd);
            },

            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [columnInd, board]
    );

    const handleColumnDrop = (
        board: ColumnType[],
        setBoard: Dispatch<SetStateAction<ColumnType[]>>,
        newColumn: number,
        oldColumn: number
    ) => {
        const deepBoardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));
        const toMove = deepBoardCopy[oldColumn];

        const newBoard = [
            ...deepBoardCopy.slice(0, oldColumn),
            ...deepBoardCopy.slice(oldColumn + 1, deepBoardCopy.length),
        ];

        if (newColumn > oldColumn) {
            newBoard.splice(newColumn - 1, 0, toMove);
        } else {
            newBoard.splice(newColumn, 0, toMove);
        }

        setBoard(newBoard);
    };

    return (
        <Flex
            flexDirection="column"
            backgroundColor={canDrop ? "blue" : "white"}
            height="90vh"
            width="100px"
            ref={drop}
        />
    );
};

export default ColumnDropZone;
