type TButtonProps = React.ComponentProps<"button"> & {
  // 필수 prop 따로 명시
  children: React.ReactNode;
};

export default function Button(props: TButtonProps) {
  const { children, ...restButtonProps } = props;
  return <button {...restButtonProps}>{children}</button>;
}
