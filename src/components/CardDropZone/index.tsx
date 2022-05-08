import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useDrop } from "react-dnd";
import type { ColumnType } from "../Column";

interface CardDropZoneProps {
    columnInd: number;
    cardInd: number;
    board: ColumnType[];
    setBoard: Dispatch<SetStateAction<ColumnType[]>>;
    isLast?: boolean;
}

const CardDropZone = ({ columnInd, cardInd, board, setBoard, isLast }: CardDropZoneProps) => {
    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: "card",

            drop: (item: any) => {
                handleColumnDrop(board, setBoard, item.columnInd, item.cardInd, columnInd, cardInd);
            },

            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [columnInd, cardInd, board]
    );

    const handleColumnDrop = (
        board: ColumnType[],
        setBoard: Dispatch<SetStateAction<ColumnType[]>>,
        oldColumnInd: number,
        oldCardInd: number,
        newColumnInd: number,
        newCardInd: number
    ) => {
        // delete current element
        const boardCopy: ColumnType[] = JSON.parse(JSON.stringify(board));
        const toMove = boardCopy[oldColumnInd].cards[oldCardInd];

        // remove it from the old index
        boardCopy[oldColumnInd].cards = [
            ...boardCopy[oldColumnInd].cards.slice(0, oldCardInd),
            ...boardCopy[oldColumnInd].cards.slice(oldCardInd + 1, boardCopy[oldColumnInd].cards.length),
        ];

        // if same column and newCardInd > oldCardInd then we can decrement it by 1 after
        if (oldColumnInd === newColumnInd && newCardInd > oldCardInd) {
            boardCopy[newColumnInd].cards.splice(newCardInd - 1, 0, toMove);
        } else {
            boardCopy[newColumnInd].cards.splice(newCardInd, 0, toMove);
        }

        setBoard(boardCopy);
    };

    return (
        <Flex
            flexDirection="column"
            backgroundColor={canDrop ? "red.300" : "white"}
            minHeight="75px"
            flexGrow={isLast ? 1 : 0}
            width="100%"
            ref={drop}
        />
    );
};

export default CardDropZone;
