import { type ReactNode } from 'react';

interface ButtonProps {
  disabledCondition?: boolean;
  onClick: () => void;
  id: string;
  children?: ReactNode;
}

export default function Button({ disabledCondition = false, id, onClick, children }: ButtonProps) {
  const elementClass = `${id} button`;
  const testid = `${id}-button`;

  return (
    <button
      className={elementClass}
      onClick={onClick}
      data-testid={testid}
      disabled={disabledCondition}
    >{children}</button>
  );
}
