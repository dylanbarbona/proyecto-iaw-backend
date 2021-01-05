export default () => ({
    HOST: process.env.HOST,
    PORT: parseInt(process.env.PORT) || 3000,
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_CLUSTER: process.env.MONGODB_CLUSTER,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    MONGODB_OPTIONS: process.env.MONGODB_OPTIONS,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    SECRET_JWT: process.env.SECRET_JWT,
    SECRET_SALT: process.env.SECRET_SALT,
    UPLOAD: process.env.UPLOAD
})