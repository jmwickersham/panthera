export interface Task {
    _id?: string;
    short_description: string;
    description: string;
    status: string;
    category: string;
    createdAt: string;
    created_by: object;
    updatedAt: string;
    updated_by: object;
    comments: Array<{}>;
}
