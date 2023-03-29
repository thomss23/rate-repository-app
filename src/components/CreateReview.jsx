import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from 'yup';
import { useCreateReview } from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

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

const CreateReviewForm = ({ onSubmit }) => {
    return (
      <View>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
        <FormikTextInput name="text" placeholder="Review" multiline />
        <Pressable onPress={onSubmit}>
          <View style={styles.submit}>
            <Text style={styles.submitText}>Create a review</Text>
          </View>
        </Pressable>
      </View>
    );
  };

const CreateReviewContainer = ({initialValues, onSubmit, validationSchema}) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
          {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
}

const initialValues = {
  ownerName: '',
  rating: '',
  repositoryName: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
  repositoryName: yup    
    .string()
    .required('Repository name is required'),
  text: yup    
    .string()
});

const CreateReview = () => {

  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { text, repositoryName, rating, ownerName } = values;
    try {
      await createReview({ text, repositoryName, rating, ownerName });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (<CreateReviewContainer onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}/>);

}

export default CreateReview;