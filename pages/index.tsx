import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import KanbanBoard from "../components/KanbanBoard";

const Home: NextPage = () => {
    return (
        <Flex>
            <Head>
                <title>Kanban Board</title>
                <meta name="description" content="Implementation of a Kanban Board in Nextjs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <KanbanBoard />
        </Flex>
    );
};

export default Home;
