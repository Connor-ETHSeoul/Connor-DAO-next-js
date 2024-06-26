export const CopyLogo = ({
  className,
  onClickEvent,
}: {
  className: string;
  onClickEvent: () => void;
}) => {
  return (
    <svg
      onClick={() => {
        onClickEvent();
      }}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M13.1579 1.66669H4.73688C3.96495 1.66669 3.33337 2.31441 3.33337 3.10608V13.1818H4.73688V3.10608H13.1579V1.66669ZM15.2632 4.54547H7.5439C6.77197 4.54547 6.14039 5.1932 6.14039 5.98487V16.0606C6.14039 16.8523 6.77197 17.5 7.5439 17.5H15.2632C16.0351 17.5 16.6667 16.8523 16.6667 16.0606V5.98487C16.6667 5.1932 16.0351 4.54547 15.2632 4.54547ZM15.2632 16.0606H7.5439V5.98487H15.2632V16.0606Z"
        fill="#9198A0"
      />
    </svg>
  );
};
