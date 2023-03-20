import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';


const initialValues = {
  username: '',
  password: '',
};

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

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" secureTextEntry />
      <Pressable onPress={onSubmit}>
        <View style={styles.submit}>
          <Text style={styles.submitText}>Sign in</Text>
        </View>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async values => {
    const { username, password } = values;
    try {
      const result = await signIn({ username, password });
      console.log(result.authenticate.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;