import React from 'react';

import { Field, FieldProps } from '../Field';
import { Select } from '../Select';


export type SelectFieldProps = FieldProps<typeof Select>


export const SelectField: React.FC<SelectFieldProps> = (props) => <Field as={Select} isDiv {...props} />;
