import { ButtonSize, ButtonType } from '@/types/ButtonType';

export const ConnorDAOButton = ({
  buttonText,
  onClickEvent,
  buttonType,
  buttonSize,
  isDisabled,
  className,
}: {
  buttonText: string;
  onClickEvent: () => void;
  buttonType: ButtonType;
  buttonSize: ButtonSize;
  isDisabled: boolean;
  className?: string;
}) => {
  return (
    <button
      className={`min-w-[100px] ${isDisabled ? 'btn-disabled' : 'btn-active'}
        ${buttonType == ButtonType.Primary ? 'bg-[#0A0B0C] text-white	' : 'border border-black bg-white'} 
        ${
          buttonSize == ButtonSize.Large
            ? 'px-[16px] py-[20px] text-lg'
            : 'px-[11px] py-[16px] text-base'
        } items-center justify-center rounded-[46px] font-medium leading-[140%] ${className}`}
      onClick={() => {
        if (isDisabled) return;
        onClickEvent();
      }}
    >
      {buttonText}
    </button>
  );
};
