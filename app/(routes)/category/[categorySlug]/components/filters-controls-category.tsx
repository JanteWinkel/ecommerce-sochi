import FilterEstilo from "./filter-estilo";

type FiltersControlsCategoryProps = {
    setFilterEstilo: (estilo: string) => void
}

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
    const { setFilterEstilo } = props;

    return (
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <FilterEstilo setFilterEstilo={setFilterEstilo} />
        </div>
    );
}

export default FiltersControlsCategory;
