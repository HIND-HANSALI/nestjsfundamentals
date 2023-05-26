
// costumeType when user sent another infos but we dont to save them in dbb
// final data we want to save in dbb
export type CreateProductParams={
    title: string;
    quantity: number;
    description: string; 
}
export type UpdateProductParams={
    title: string;
    quantity: number;
    description: string; 
}
export type CreateProductDetailsParams={
    description: string;
}
export type CreateProductReviewsParams={
    content: string;
    rating: number;
}
export type CreateProductTagsParams={
    name: string;
}