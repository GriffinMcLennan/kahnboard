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
                // console.log(item, columnInd);
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
        // any change to the left will have an effect
        const toLeftChange = newColumn < oldColumn;

        // changes to the right require a difference of larger than 1
        const toRightChange = newColumn > oldColumn + 1;

        if (!toLeftChange && !toRightChange) return;

        // console.log("newColumn:", newColumn, "oldColumn:", oldColumn);
        /*
          arr = [c1, c2, c3, c4, c5, c6]
                  new,        old

          remove old: arr = [c1, c2, c3, c5, c6]

          append removed:
        */

        const removed = board[oldColumn];

        const leftArr = board.slice(0, oldColumn);
        const rightArr = board.slice(oldColumn + 1, board.length);
        const combined = [...leftArr, ...rightArr];

        // console.log("oldBoard:", board);
        // console.log("left:", leftArr, "right:", rightArr);
        // console.log("Combined:", combined);
        // console.log("removed:", removed);

        if (toLeftChange) {
            combined.splice(newColumn, 0, removed);
        } else {
            combined.splice(newColumn - 1, 0, removed);
        }

        setBoard(combined);
    };

    return (
        <Flex flexDirection="column" backgroundColor="blue" height="100vh" width="100px" ref={drop}>
            <Text>Column Drop Zone!</Text>
            {canDrop ? "Can drop here" : "Cant drop here"}
        </Flex>
    );
};

export default ColumnDropZone;
