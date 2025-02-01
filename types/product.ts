export type ProductType = {
    id: number;
    attributes: {
        productName: string;
        slug: string;
        description: string;
        active: boolean;
        estilo: string;
        isFeatured: boolean;
        price: number;
        
        images: {
            data: {
                id: number;
                attributes: {
                    url: string;
                };
            }[];
        };

        category: {
            data: {
                id: number;
                attributes: {
                    categoryName: string;
                    slug: string | null;
                    createdAt: string;
                    updatedAt: string;
                    publishedAt: string;
                };
            };
        };

        departamento?: {
            data: {
                id: number;
                attributes: {
                    departamentoName: string;
                    slug: string | null;
                    createdAt: string;
                    updatedAt: string;
                    publishedAt: string;
                };
            };
        };
        
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};
