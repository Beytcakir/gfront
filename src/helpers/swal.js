import Swal from "sweetalert2";

export const swAlert = (title, icon = "info", text = "") => {
	Swal.fire({
		title,
		text,
		icon,
	});
};

export const swConfirm = (
    title,
    icon = 'info',
    text = '',
    confirmButtonText = 'Onayla',
    cancelButtonText = 'İptal'
) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText
    });
};

export const swToast = (title, icon = "info") => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});
	Toast.fire({
		icon,
		title,
	});
};
