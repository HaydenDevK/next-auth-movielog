type TCheckboxImageProps = {
  backgroundColor: string;
};

export default function Checkbox(props: TCheckboxImageProps) {
  const { backgroundColor } = props;
  return (
    <div
      className={`flex items-center justify-center w-[20px] h-[20px] border-2 border-dark-4f rounded-[5px] ${backgroundColor}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
      >
        <path
          d="M15.7991 5.76668C15.7247 5.69172 15.6363 5.63221 15.5388 5.59161C15.4413 5.551 15.3368 5.5301 15.2312 5.5301C15.1256 5.5301 15.0211 5.551 14.9236 5.59161C14.8262 5.63221 14.7377 5.69172 14.6633 5.76668L8.70474 11.7333L6.20133 9.22187C6.12413 9.1473 6.033 9.08866 5.93314 9.0493C5.83328 9.00995 5.72664 8.99065 5.61932 8.99251C5.512 8.99436 5.4061 9.01734 5.30766 9.06013C5.20922 9.10291 5.12017 9.16467 5.0456 9.24186C4.97103 9.31906 4.91239 9.41019 4.87304 9.51006C4.83368 9.60992 4.81438 9.71655 4.81624 9.82387C4.8181 9.93119 4.84107 10.0371 4.88386 10.1355C4.92664 10.234 4.9884 10.323 5.0656 10.3976L8.13687 13.4689C8.21123 13.5438 8.29969 13.6033 8.39715 13.6439C8.49462 13.6845 8.59916 13.7055 8.70474 13.7055C8.81033 13.7055 8.91487 13.6845 9.01233 13.6439C9.10979 13.6033 9.19825 13.5438 9.27261 13.4689L15.7991 6.9424C15.8803 6.86751 15.945 6.77661 15.9894 6.67543C16.0337 6.57426 16.0566 6.465 16.0566 6.35454C16.0566 6.24409 16.0337 6.13483 15.9894 6.03365C15.945 5.93248 15.8803 5.84158 15.7991 5.76668Z"
          fill="white"
        />
      </svg>
    </div>
  );
}