'use server';

import {
    YupValidationError,
    convertFormDataToJSON,
    response,
    transformYupErrors
} from '@/helpers/form-validation';
import { updatePassword } from '@/services/yonetici-service';
import { revalidatePath } from 'next/cache';

export const updatePasswordAction = async (prevState, formData) => {
    try {
        const fields = convertFormDataToJSON(formData);

        const res = await updatePassword(formData);
        const data = await res.json();

        if (!res.ok) {
            return response(false, data?.mesage);
        }

        revalidatePath('/dashboard/yonetici-menu');
        return response(true, data?.message);
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};
