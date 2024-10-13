import * as Yup from "yup";

export const YoneticiSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string()
        .min(8, 'Min 8 chars')
        .matches(/[a-z]+/, 'At least one lowercase')
        .matches(/[A-Z]+/, 'At least one uppercase')
        .matches(/\d+/, 'At least one number')
        .matches(/[@#$%^&+*=]+/, 'At least one special char')
        .required('Required')
   
});
