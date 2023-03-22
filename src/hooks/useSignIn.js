import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

export const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    console.log('authStorage:', authStorage);
    try {
        const { data } = await mutate({
            variables: { username, password },
        });
        console.log("access token is ", data.authenticate.accessToken)
        await authStorage.setAccessToken(data.authenticate.accessToken)
        apolloClient.resetStore();
        } catch (e) {
        throw new Error(e.message);
    }};

  return [signIn, result];
};