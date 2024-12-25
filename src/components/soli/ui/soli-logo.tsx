import Image from 'next/image';

type SoliLogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export const SoliLogo = ({
  className,
  width = 29,
  height = 24,
}: SoliLogoProps) => {
  return (
    <Image
      src='/assets/images/logo.svg'
      alt=' solisys-logo'
      width={width}
      height={height}
      className={className}
    />
  );
};
