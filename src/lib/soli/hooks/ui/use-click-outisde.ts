import { RefObject, useEffect } from 'react';
/** Use this hook to execute a callback function upon clicking outside an element
 *
 * Example:
 *
 * TS:
 *
 * const asideRef = useRef(null);
 *
 * useClickOutside(asideRef, () => {});
 *
 * TSX:
 *
 * <aside... ref={asideRef} .. />
 *
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | RefObject<T>[],
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!target || !target.isConnected) {
      return;
    }
    const isOutside = Array.isArray(ref)
      ? ref
          .filter((r) => Boolean(r.current))
          .every((r) => r.current && !r.current.contains(target))
      : ref.current && !ref.current.contains(target);
    if (isOutside) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
