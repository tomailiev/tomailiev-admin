import * as yup from 'yup';

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8)
});

const audioSchema = yup.object().shape({
    audioUrl: yup.string().url().required(),
    description: yup.string().min(3),
    featured: yup.boolean().default(false),
    title: yup.string().required().min(6)
});

const eventSchema = yup.object().shape({
    alt: yup.string().default(''),
    dateTime: yup.date().required(),
    eventName: yup.string().required(),
    eventUrl: yup.string().url().required(),
    groupName: yup.string().required(),
    location: yup.string(),
    venue: yup.string().required()
});

const imageSchema = yup.object().shape({
    caption: yup.string().required(),
    imageUrl: yup.string().required().url()
});

const recSchema = yup.object().shape({
    spotifyUrl: yup.string().required().url()
});

const videoSchema = yup.object().shape({
    youtubeUrl: yup.string().url().required(),
    featured: yup.boolean().default(false)
});

export {
    userSchema,
    audioSchema,
    eventSchema,
    imageSchema,
    recSchema,
    videoSchema
};