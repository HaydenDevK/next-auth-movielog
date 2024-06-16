type TInputProps = React.ComponentProps<"input"> & {
  // 필수 prop 따로 명시
  type: string;
};

export default function Input(props: TInputProps) {
  const { className, type, ...restInputProps } = props;
  return (
    <input
      className={`px-[14px] py-3 rounded-lg border border-dark-4f text-[14px] font-[500] leading-normal text-dark-4f placeholder:text-light-ac ${className}`}
      type={type}
      {...restInputProps}
    />
  );
}
