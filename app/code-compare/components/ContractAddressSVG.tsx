export const ContractAddressSVG = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      width="100%"
      height="72"
      viewBox="0 0 575 72"
      fill="none"
    >
      <path d="M0 0H556.516L575 36L556.516 72H0V0Z" fill="#F5F5F6" />
      <text
        className={`fill-[#000]`}
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        0xDeEbB2c45A7DBc0bF32DbAC35f66C6752b047d16
      </text>
    </svg>
  );
};
