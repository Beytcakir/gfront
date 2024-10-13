import * as Yup from "yup";


export const AuthSchema = Yup.object({
	username: Yup.string().required("Required"),
	password: Yup.string().required("Şifre alanı boş bırakılamaz"),
});
