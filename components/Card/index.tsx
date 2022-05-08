import { Flex, Text, Textarea } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { useDrag } from "react-dnd";
import { ColumnType } from "../Column";

interface CardProps {
    board: ColumnType[];
    columnInd: number;
    cardInd: number;
}

interface CardType {
    name: string;
    description: string;
    status: boolean;
}

const Card = ({ board, columnInd, cardInd }: CardProps) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "card",
            item: {
                columnInd,
                cardInd,
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [columnInd, cardInd, board]
    );

    return (
        <Flex
            ref={drag}
            flexDirection="column"
            border="1px solid gray"
            borderRadius="6px"
            width="220px"
            alignItems="center"
            opacity={isDragging ? 0 : 1}
        >
            <Text>
                columnInd: {columnInd}, cardInd: {cardInd}{" "}
            </Text>
        </Flex>
    );
};

export type { CardType };
export default Card;
