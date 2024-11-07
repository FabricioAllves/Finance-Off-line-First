import React from 'react';
import { Controller, UseControllerProps, FieldValues } from 'react-hook-form';
import { Select, SelectProps } from '../Select/Select';

interface FormSelectProps<FormType extends FieldValues> extends Omit<SelectProps, 'defaultValue' | 'onSelect'>, UseControllerProps<FormType> { }

export function FormSelect<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...selectProps
}: FormSelectProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Select
          value={field.value ? selectProps.options.find(option => option.value === field.value)?.label : ""}
          onSelect={(value) => field.onChange(value)}
          disabled
          errorMessage={fieldState.error?.message}
          {...selectProps}
        />
      )}
    />
  );
}
