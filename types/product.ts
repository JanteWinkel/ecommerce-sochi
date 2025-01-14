export type ProductType = {
    id: number;
    productName: string;
    slug: string;
    description: string;
    active: boolean;
    estilo: string;
    isFeatured: boolean;
    
    price: number;
    images: {
            id: number
            url: string;
    }[];
    category: {
        id: number;
        documentId: string;
        categoryName: string;
        slug: string | null;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
    departamento: {
        id: number;
        documentId: string;
        departamentoName: string;
        slug: string | null;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}