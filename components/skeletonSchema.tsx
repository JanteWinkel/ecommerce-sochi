import { Skeleton } from "./ui/skeleton";

type SkeletonSchemaProps = {
  grid: number;
};

const SkeletonSchema = (props: SkeletonSchemaProps) => {
  const { grid } = props;

  return (
    <>
      {Array.from({ length: grid }).map((_, index) => (
        <div key={index} className="flex flex-col gap-8 mx-auto space-y-3">
          {/* Skeleton con color rosado, opacidad 50% y brillo 70% */}
          <Skeleton
            className="h-[125px] w-[250px] rounded-xl"
            style={{
              backgroundColor: "rgba(255, 105, 180, 0.5)", // Rosado con 50% de opacidad
              filter: "brightness(50%)", // Brillo al 70%
            }}
          />
          <div className="space-y-2">
            <Skeleton
              className="h-4 w-[250px]"
              style={{
                backgroundColor: "rgba(255, 105, 180, 0.5)", // Rosado con 50% de opacidad
                filter: "brightness(50%)", // Brillo al 70%
              }}
            />
            <Skeleton
              className="h-4 w-[250px]"
              style={{
                backgroundColor: "rgba(255, 105, 180, 0.5)", // Rosado con 50% de opacidad
                filter: "brightness(50%)", // Brillo al 70%
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonSchema;