import { Toaster } from 'sonner';
import CircleRedX from '@/public/assets/icons/circle-red-x.svg';
import GreenCheckmarkCircle from '@/public/assets/icons/green-checkmark-circle.svg';
type ToasterWrapperProps = {};

export const ToasterWrapper = ({}: ToasterWrapperProps) => {
  const toasterVariants = {
    error: 'bg-error-500 border-s-8 border-s-error-700',
    success: 'bg-success-500 border-s-8 border-s-success-700',
    // info: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
    // warning:
    // 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
  };

  return (
    <Toaster
      className='me-'
      pauseWhenPageIsHidden={true}
      closeButton={true}
      icons={{ error: <CircleRedX />, success: <GreenCheckmarkCircle /> }}
      toastOptions={{
        classNames: {
          content: 'pe-10',
          error: toasterVariants.error,
          success: toasterVariants.success,
          closeButton:
            'right-7 left-auto top-1/2 -translate-y-1/2 [&>svg]:scale-150 !bg-transparent ',
          icon: 'me-6',
          title: 'h6-typo text-gray-900',
          description: 'body-typo text-gray-800',
        },
      }}
    />
  );
};
