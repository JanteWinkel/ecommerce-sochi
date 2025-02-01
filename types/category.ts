export type CategoryType = {
    id: number;
    attributes: {
        categoryName: string;
        slug: string;
        mainImage: {
            id: number;
            url: string;
        }
    }
}
