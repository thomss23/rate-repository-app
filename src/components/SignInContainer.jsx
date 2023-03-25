import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

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

const SignInContainer = ({initialValues, onSubmit, validationSchema}) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
}

export default SignInContainer