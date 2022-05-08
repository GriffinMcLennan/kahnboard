import { Flex, Text, Textarea } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";

interface CardProps {
    title: string;
    _description: string;
}

interface CardType {
    title: string;
    description: string;
    status: boolean;
}

const Card = ({ title, _description }: CardProps) => {
    const [description, setDescription] = useState(_description);

    const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
        setDescription(event.target.value);
    };

    return (
        <Flex flexDirection="column" border="1px solid gray" borderRadius="6px" width="220px" alignItems="center">
            <Text>{title}</Text>
            <Textarea value={description} onChange={handleChange} />
        </Flex>
    );
};

export type { CardType };
export default Card;
