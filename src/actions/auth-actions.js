'use server';

import { signIn } from '@/auth';
import {
    YupValidationError,
    convertFormDataToJSON,
    response,
    transformYupErrors
} from '@/helpers/form-validation';
import { AuthSchema } from '@/helpers/schemas/auth-schema';
import { AuthError } from 'next-auth';

export const loginAction = async (prevState, formData, onSuccess) => {
    const fields = convertFormDataToJSON(formData);

    try {
        AuthSchema.validateSync(fields, { abortEarly: false });
        console.log("fields",fields);

        const result = await signIn('credentials', fields);

        if(result.ok){
            console.log("result in login-action",result.ok);
            if (onSuccess) {
                onSuccess();
            }
            
        }else{
            return response(false, 'Girdiğiniz şifre eksik veya hatalı');
        }

    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        } else if (err instanceof AuthError) {
            return response(false, 'Girdiğiniz şifre eksik veya hatalı');
        }

        throw err;
    }
};
