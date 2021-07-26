import * as yup from 'yup';

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8)
});

const audio = yup.object().shape({
    audioUrl: yup.string().url().required(),
    // description: yup.string().min(3),
    featured: yup.boolean().default(false),
    // title: yup.string().required().min(6)
});

const event = yup.object().shape({
    alt: yup.string().default(''),
    dateTime: yup.date().required(),
    eventName: yup.string().required(),
    eventUrl: yup.string().url().required(),
    groupName: yup.string().required(),
    location: yup.string(),
    venue: yup.string().required()
});

const image = yup.object().shape({
    caption: yup.string().required(),
    imageUrl: yup.string().required().url()
});

const rec = yup.object().shape({
    spotifyUrl: yup.string().required().url(),
    infoUrl: yup.string().url(),
    featured: yup.boolean().default(false)
});

const video = yup.object().shape({
    youtubeUrl: yup.string().url().required(),
    featured: yup.boolean().default(false)
});

export {
    userSchema,
    audio,
    event,
    image,
    rec,
    video
};