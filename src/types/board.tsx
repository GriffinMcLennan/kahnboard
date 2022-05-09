interface ColumnType {
    id: string;
    name: string;
    order: number;
    cards: CardType[];
}

interface CardType {
    name: string;
    description: string;
    createdAt: string;
    status: TaskStatus;
    order: number;
    key: string;
}

enum TaskStatus {
    OPEN,
    CLOSED,
}

export { TaskStatus };
export type { ColumnType, CardType };
