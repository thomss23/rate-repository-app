import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

export const useSignUp = () => {
    const [mutate, result] = useMutation(CREATE_USER);
  
    const signUp = async ({ username, password}) => {
      try {
        await mutate({
          variables: {
            username,
            password,
          },
        });
      } catch (e) {
        console.log(e);
        throw new Error(e.message);
      }
    };
  
    return [signUp, result];
  };