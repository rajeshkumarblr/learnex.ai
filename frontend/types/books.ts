export interface Book {
    _id: string;
    title: string;
    description: string;
    pdf_url: string;
    category_id: string;
}

export interface Category {
    _id: string;
    name: string;
    parent_id?: string;
    order: number;
}