import Checkbox from "./Checkbox";

type TTermsProps = React.ComponentProps<"input"> & {
  children: React.ReactNode;
};

export default function TermLabel(props: TTermsProps) {
  const { id, children, checked, ...restProps } = props;

  return (
    <label
      className="flex gap-[8px] mb-[20px] text-dark-4f text-[14px] font-[500] leading-normal cursor-pointer"
      htmlFor={id}
    >
      <input
        className="appearance-none absolute" // TODO 좀 더 좋은 방법이 있을까? 백그라운드 이미지 처리?
        id={id}
        type="checkbox"
        checked={checked}
        {...restProps}
      />
      <Checkbox backgroundColor={checked ? "bg-dark-4f" : "bg-white"} />
      {children}
    </label>
  );
}
