import { cn } from '@/lib/utils';

type LoadingMsgProps = {
  loadingMsg: string;
  className?: string;
};

export const LoadingMsg = ({ loadingMsg, className }: LoadingMsgProps) => {
  return (
    <div
      className={cn(
        'border-5 flex items-center gap-[.875rem] border border-[#e5f1ff] bg-[#eef5ff] p-[.9375rem]',
        className
      )}
    >
      <svg
        className='animate-spin'
        width='30'
        height='31'
        viewBox='0 0 30 31'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='15'
          cy='15.157'
          stroke='#458DEA'
          strokeOpacity='.25'
          strokeWidth='3'
          r='10.965'
        />
        <path
          d='M14.924 4.192a10.965 10.965 0 0 1 11.04 10.89'
          stroke='url(#5y4badkpta)'
          strokeWidth='3'
          strokeLinecap='round'
        />
        <defs>
          <linearGradient
            id='5y4badkpta'
            x1='24.466'
            y1='20.691'
            x2='5.534'
            y2='9.623'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#458DEA' />
            <stop offset='.755' stopColor='#458DEA' stopOpacity='.01' />
            <stop offset='1' stopColor='#458DEA' stopOpacity='0' />
          </linearGradient>
        </defs>
      </svg>

      <p className='body text-[#458dea]'>{loadingMsg}</p>
    </div>
  );
};
