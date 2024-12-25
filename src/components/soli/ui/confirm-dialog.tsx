import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface CustomDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmBtnLabel: string;
  cancelBtnLabel: string;
  contentClassName?: string;
  onCancel: () => void;
  onConfirm: () => void;
}
export const ConfirmDialog = ({
  title,
  description,
  open,
  confirmBtnLabel,
  cancelBtnLabel,
  onCancel,
  onConfirm,
  contentClassName,
}: CustomDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby={undefined}
        className={cn('w-[23.25rem] max-w-[90%] gap-0', contentClassName)}
      >
        <DialogTitle className='mb-8 text-center'>{title}</DialogTitle>
        <DialogDescription className='mb-10 px-2 text-center text-base text-gray-900'>
          {description}
        </DialogDescription>

        <div className='flex justify-between gap-x-8'>
          <Button variant='outline' className='grow' onClick={() => onCancel()}>
            {cancelBtnLabel}
          </Button>

          <Button
            variant='default'
            className='grow'
            onClick={() => onConfirm()}
          >
            {confirmBtnLabel}
          </Button>
        </div>
        <DialogClose hidden={true} className='hidden'></DialogClose>
      </DialogContent>
    </Dialog>
  );
};
