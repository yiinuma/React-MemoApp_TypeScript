import React, { VFC } from 'react';

type Props = {
  CustomTag: React.ElementType;
  id: string;
  required: boolean;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const ModalInput: VFC<Props> = (props) => {
  const { CustomTag, id, type, value, onChange, required } = props;
  return (
    <CustomTag
      id={id}
      required={required}
      type={type}
      value={value}
      onChange={onChange}
      className="text-m placeholder-blueGray-300 w-full rounded border-0 px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
    />
  );
};
