import Image from 'next/image';

type SoliTextLogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export const SoliTextLogo = ({
  className,
  width = 160,
  height = 38,
}: SoliTextLogoProps) => {
  return (
    <Image
      src='/assets/images/logo-text.svg'
      alt=' solisys-logo'
      width={width}
      height={height}
      className={className}
    />
  );
};
