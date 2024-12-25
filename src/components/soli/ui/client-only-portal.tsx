import { createPortal } from 'react-dom';

type ClientOnlyPortalProps = {
  children: React.ReactNode;
  selector?: string;
};

export const ClientOnlyPortal = ({
  children,
  selector = '#modal',
}: ClientOnlyPortalProps) => {
  // const ref = useRef<Element | null>(null);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   if (typeof document !== 'undefined') {
  //     ref.current = document.querySelector(selector);
  //     setMounted(true);
  //   }
  // }, [selector]);

  // return mounted && ref.current ? createPortal(children, ref.current) : null;
  return createPortal(
    children,
    document.querySelector(selector) || document.body
  );
};
