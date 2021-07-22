import * as yup from 'yup';

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8)
});

export { userSchema };