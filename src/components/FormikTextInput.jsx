import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import { useState } from 'react';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 12,
  },
  errorInput: {
    borderColor: 'red',
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={[styles.input, meta.error && styles.errorInput]}        
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;