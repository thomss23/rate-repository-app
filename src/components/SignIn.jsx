import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  // submit : {
  //   backgroundColor: 'blue',
  //   textAlign: 'center',
  //   margin: 10,
  //   fontSize: 16,
  //   color: 'white',
  //   borderWidth: 1,
  //   borderRadius: 100,
  //   borderColor: 'blue',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  // }
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
      {/* <Pressable onPress={onSubmit}>
        <Text fontWeight='bold' style={styles.submit}>Sign in</Text>
      </Pressable> */}
      <Pressable onPress={onSubmit}>
        <View style={styles.submit}>
          <Text style={styles.submitText}>Sign in</Text>
        </View>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    // const username = values.username;
    // const password = values.password;
    console.log(values)
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;