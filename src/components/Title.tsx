type TTitleProps = React.ComponentProps<"div"> & {
  h1Text?: string;
  h2Text?: string;
};

export default function Title(props: TTitleProps) {
  const { className: divClassName, h1Text, h2Text } = props;
  return (
    <div className={`flex flex-col gap-[10px] ${divClassName}`}>
      {h1Text && <h1 className=" text-2xl font-[700] leading-7">{h1Text}</h1>}
      {h2Text && (
        <h2 className="text-lg font-[500] leading-normal">{h2Text}</h2>
      )}
    </div>
  );
}
