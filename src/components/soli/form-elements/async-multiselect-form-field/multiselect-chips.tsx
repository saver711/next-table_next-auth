import { components, GroupBase, ValueContainerProps } from 'react-select';

export const MultiselectChips = <D,>({
  maxChipsToShow,
  children,
  ...props
}: ValueContainerProps<D, true, GroupBase<D>> & {
  maxChipsToShow: number;
}) => {
  const { getValue } = props;
  const length = getValue().length;

  const displayLength = length - maxChipsToShow;

  return (
    <components.ValueContainer {...props}>
      {children}
      <span>{displayLength > 0 && !!length && `+ ${displayLength}`}</span>
    </components.ValueContainer>
  );
};
