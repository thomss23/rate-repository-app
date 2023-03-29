import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";
import { useAuthStorage } from '../hooks/useAuthStorage';
import SignInContainer from './SignInContainer';

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

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();

  const onSubmit = async values => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      const loggedInUser = await authStorage.getAccessToken();
      console.log(loggedInUser)
      if (loggedInUser) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (<SignInContainer onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}/>);
};

export default SignIn;