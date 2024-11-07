import React from 'react';
import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';
import { DateInput, DateProps } from '../DateInput/DateInput';

export function FormDateInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...dateInputProps
}: DateProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <DateInput
          value={typeof field.value === 'string' ? new Date(field.value) : field.value}
          onChange={field.onChange}
          errorMessage={fieldState.error?.message}
          disabled
          {...dateInputProps}
        />
      )}
    />
  );
}
