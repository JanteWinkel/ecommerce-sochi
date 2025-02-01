import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";

type FilterEstiloProps = {
    setFilterEstilo: (estilo: string) => void
}

const FilterEstilo = (props: FilterEstiloProps) => {
    const { setFilterEstilo } = props;
    const { result, loading }: FilterTypes = useGetProductField();

    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Estilo</p>
            {loading && result == null && (
                <p>Cargando estilo... </p>
            )}
            <RadioGroup onValueChange={(value) => setFilterEstilo(value)}>
                <div key="todos" className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="todos" />
                    <Label htmlFor="todos">Todos</Label>
                </div>
                {result !== null && result.schema?.attributes?.estilo?.enum?.map((estilo: string) => (
                    <div key={estilo} className="flex items-center space-x-2">
                        <RadioGroupItem value={estilo} id={estilo} />
                        <Label htmlFor={estilo}>{estilo}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterEstilo;
