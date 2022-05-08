import { Flex, Text } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
interface ColumnProps {
    title: string;
    date: string;
    columnInd: number;
}

const Column = ({ title, date, columnInd }: ColumnProps) => {
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
        [columnInd]
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
            <Text>{title}</Text>
            <Text>{date}</Text>
            <Text>{columnInd}</Text>
        </Flex>
    );
};

export default Column;
