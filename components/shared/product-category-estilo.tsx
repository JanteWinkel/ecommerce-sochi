interface ProductCategoryEstilo{
     categoryName: string,
     estilo: string
}

const ProductCategoryEstilo = (props: ProductCategoryEstilo) => {
    const {categoryName, estilo} = props

    return (
        <div className="flex items-center gap-3">
            <p className="px-2 py-1 text-white bg-primary/50 rounded-full w-fit">{categoryName}</p>
            <p className="px-2 py-1 text-white bg-primary rounded-full w-fit">{estilo}</p>
        </div>
    );
}

export default ProductCategoryEstilo;