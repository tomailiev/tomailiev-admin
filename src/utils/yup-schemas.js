import * as yup from 'yup';

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8)
});

export { userSchema };