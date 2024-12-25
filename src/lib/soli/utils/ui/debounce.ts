export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timer: NodeJS.Timeout | undefined;
  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  } as T;
};
