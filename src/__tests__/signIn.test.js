import { render, fireEvent, waitFor, screen} from '@testing-library/react-native';
import React from 'react';
import SignInContainer from '../components/SignInContainer';
import * as yup from 'yup';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      
        const initialValues = {
            username: '',
            password: '',
            };
            
            const validationSchema = yup.object().shape({
            username: yup
                .string()
                .required('Username is required'),
            password: yup
                .string()
                .required('Password is required'),
            });
      
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}/>);

      const usernameField = screen.getByPlaceholderText('username');
      const passwordField = screen.getByPlaceholderText('password');
      const submitButton = screen.getByText('Sign in');

      fireEvent.changeText(usernameField, 'tom');
      fireEvent.changeText(passwordField, 'password');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'tom',
          password: 'password',
        });
      });
    });
  });
});