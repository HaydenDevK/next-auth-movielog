type TTitleProps = {
  h1Text?: string;
  h2Text?: string;
};

export default function Title(props: TTitleProps) {
  const { h1Text, h2Text } = props;
  return (
    <div className="flex gap-[10px] mb-5 text-dark-4f">
      {h1Text && <h1 className=" text-xl font-[700] leading-7">{h1Text}</h1>}
      {h2Text && (
        <h2 className="text-lg font-[500] leading-normal">{h2Text}</h2>
      )}
    </div>
  );
}
