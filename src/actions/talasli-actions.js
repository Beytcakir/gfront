'use server';

import { revalidatePath } from 'next/cache';

import {
    YupValidationError,
    response,
    convertFormDataToJSON,
    transformYupErrors
} from '@/helpers/form-validation';

import {
    updateMilKoparma,
    updateMilTornalama,
    updateMilTaslama,
    updateisilIslem,
    updateboruKesme,
    updateEzme,
    rollBackLastChange
} from '@/services/talasliimalamiri-service';

export const updateQuantity = async (producedQuantity,orderId, processId) => {
    try {
        const res = await updateStatus(orderId); // Renamed from response to res

        // Determine content type to parse correctly
        const data = await res.json(); // Gelecek olan response'ı json formatına çeviriyoruz

        if (!res.ok) {
            return {
                success: false,
                message: data.message || 'Bir hata oluştu'
            };
        }

        revalidatePath('/dashboard/talasli-imalat-amiri');
        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        console.error('Error in updateOrderStatus:', err);
        throw err;
    }
};

export const milKoparmaAction = async (formData, operationId ) => {
    try{
        console.log('formData from milKoparmaAction:', formData, operationId);
        

        const fields = convertFormDataToJSON(formData);
        const res = await updateMilKoparma(fields, operationId);
        const data = await res.json();  

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }
        
        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };

    }catch(err){
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const milTornalamaAction = async (formData, operationId) => {
    try {
        console.log('formData from milTornalamaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateMilTornalama(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        console.error('Error in milTornalamaAction:', err);
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const milTaslamaAction = async (formData, operationId) => {
    try {
        console.log('formData from milTaslamaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateMilTaslama(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const isilIslemAction = async (formData, operationId) => {
    try {
        console.log('formData from milTaslamaAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateisilIslem(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const boruKesmeAction = async (formData, operationId) => {
    try {
        console.log('formData from boruKesmeActıon:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateboruKesme(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const ezmeAction = async (formData, operationId) => {
    try {
        console.log('formData from ezmeAction:', formData, operationId);

        const fields = convertFormDataToJSON(formData);
        const res = await updateEzme(fields, operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};

export const rollBackLastChangeAction = async ( operationId) => {
    try {
        console.log('formData from boruKesmeActıon:', operationId);
        const res = await rollBackLastChange(operationId);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

        return {
            success: true,
            message: data.message || 'Sipariş başarıyla güncellendi'
        };
    } catch (err) {
        if (err instanceof YupValidationError) {
            return transformYupErrors(err.inner);
        }
        throw err;
    }
};