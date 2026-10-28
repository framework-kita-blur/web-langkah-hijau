import { useId, type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function TextField({ label, id, className, ...rest }: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="field">
      {label ? (
        <label className="field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input id={inputId} className={['field__input', className].filter(Boolean).join(' ')} {...rest} />
    </div>
  );
}
