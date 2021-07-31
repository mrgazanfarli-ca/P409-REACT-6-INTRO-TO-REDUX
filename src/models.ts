export interface IAsyncData<T> {
    error?: string;
    data?: T;
    loading?: boolean;
}

export interface IProduct {
    id: string;
    name: string;
    imageUrl: string;
    categoryId: string;
}

export interface ICategory {
    id: string;
    name: string;
    imageUrl?: string;
}
