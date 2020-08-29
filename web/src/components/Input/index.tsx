import React, { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';
import { MdError } from 'react-icons/md';

import { InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  register: any;
  Icon: IconType;
  error: FieldError | undefined;
  onIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  labelName,
  register,
  Icon,
  error,
  onIconClick,
  ...rest
}) => {
  return (
    <InputContainer>
      <label htmlFor={labelName}>{labelName}</label>
      <input
        id={labelName}
        ref={register}
        {...rest}
        style={error && { borderColor: '#de0f49' }}
      />

      <span className={error ? 'input-error' : ''}>
        <p>{error?.message}</p>
        {error ?
          <MdError
            size="20"
            color="#de0f49"
          /> :
          <Icon
            size="20"
            color="#1e1a15"
            onClick={onIconClick}
          />}
     </span>
    </InputContainer>
  );
}

export default Input;
