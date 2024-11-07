import React from 'react';
import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';
import { CurrencyInput, CurrencyInputProps } from '../CurrencyInput/CurrencyInput';

interface FormCurrencyInputProps<FormType extends FieldValues> extends Omit<CurrencyInputProps, 'value' | 'onChange'>, UseControllerProps<FormType> { }

export function FormCurrencyInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  ...textInputProps
}: FormCurrencyInputProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <CurrencyInput
          placeholder={placeholder}
          value={field.value}
          onChange={field.onChange}
          errorMessage={fieldState.error?.message}
          disabled
          {...textInputProps}
        />
      )}
    />
  );
}
