import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

export const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
  
    const createReview = async ({ text, repositoryName, rating, ownerName }) => {
      try {
        await mutate({
          variables: {
            text,
            repositoryName,
            rating: parseInt(rating, 10),
            ownerName
          },
        });
      } catch (e) {
        console.log(e);
        throw new Error(e.message);
      }
    };
  
    return [createReview, result];
  };