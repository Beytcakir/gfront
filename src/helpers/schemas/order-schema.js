import * as Yup from 'yup';

export const OrderSchema = Yup.object().shape({
    customerName: Yup.string()
        .trim() // Removes leading/trailing spaces
        .min(4, 'Müşteri adı en az 4 karakter olmalı')
        .required('Müşteri adı boş olamaz'),

    gasanNo: Yup.string()
        .trim() // Removes leading/trailing spaces
        .matches(/^\d{4} [A-Z]{1,3} \d{6}$/, 'Gasan No formatı hatalı')
        .required('Gasan numarası boş olamaz'),

    orderNumber: Yup.string()
        .trim() // Removes leading/trailing spaces
        .matches(/^\d{6}$/, 'Sipariş numarası 6 haneli olmalı')
        .required('Sipariş numarası boş olamaz'),

    deliveryDate: Yup.date()
        .required('Teslimat tarihi boş olamaz')
        .min(new Date(), 'Teslimat tarihi bugünden önce olamaz'),

    orderType: Yup.string()
        .trim() // Removes leading/trailing spaces
        .required('Sipariş tipi boş olamaz'),

    orderQuantity: Yup.number()
        .min(1, 'Sipariş adedi en az 1 olmalıdır')
        .max(100000, 'Sipariş adedi çok yüksek')
        .required('Sipariş adedi boş olamaz'),

    orderStatus: Yup.string()
        .trim() // Removes leading/trailing spaces
        .required('Sipariş durumu boş olamaz'),

    readyMilCount: Yup.number()
        .min(0, 'Hazır Mil Miktarı negatif olamaz')
        .optional()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === '' ? null : value
        )
});


