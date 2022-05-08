import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useDrag } from "react-dnd";
import Card, { CardType } from "../Card";

interface ColumnProps {
    title: string;
    date: string;
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

const CardColumn = ({ title, date, columnInd, board, setBoard }: ColumnProps) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "column",
            item: {
                title,
                date,
                columnInd,
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [columnInd, board]
    );

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            width="250px"
            border="1px solid black"
            borderRadius="6px"
            marginY="20px"
            ref={drag}
            opacity={isDragging ? 0 : 1}
        >
            <Text>Title: {title}</Text>
            <Text>Date: {date}</Text>
            <Text>ColumnInd: {columnInd}</Text>

            {board[columnInd].cards.map((card) => (
                <Card key={card.description} title="pizza" _description="hi" />
            ))}
        </Flex>
    );
};

export type { ColumnType };
export default CardColumn;
