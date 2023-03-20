import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

export const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { username, password },
      });
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return [signIn, result];
};