export interface ICreateTodoDto {
    todo: string;
    done: boolean;
}

export interface IUpdateTodoDto {
    todo: string;
    done: boolean;
}

export interface IItem {
    id: number | null;
    todo: string;
    done: boolean;
}
