import * as yup from 'yup';
import { useNavigate } from "react-router-native";
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import { useSignUp } from '../hooks/useSignUp';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const styles = StyleSheet.create({
    submit: {
      backgroundColor: 'blue',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '90%',
      alignSelf: 'center',
      margin: 12,
      borderWidth: 1,
      borderColor: 'blue',
    },
    submitText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
const SignUpForm = ({ onSubmit }) => {
    return (
      <View>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry />
        <Pressable onPress={onSubmit}>
          <View style={styles.submit}>
            <Text style={styles.submitText}>Sign in</Text>
          </View>
        </Pressable>
      </View>
    );
  };

const SignUpContainer = ({initialValues, onSubmit, validationSchema}) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
          {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (<SignUpContainer onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}/>);
};

export default SignUp;