import dynamic from "next/dynamic";
import React from "react";

const Icon = ({ family, icon, ...rest }) => {
	const icons = {
		ai: dynamic(() => import("react-icons/ai").then((item) => item[icon])),
		tfi: dynamic(() =>
			import("react-icons/tfi").then((item) => item[icon])
		),
		fa: dynamic(() => import("react-icons/fa").then((item) => item[icon])),
		bi: dynamic(() => import("react-icons/bi").then((item) => item[icon])),
		md: dynamic(() => import("react-icons/md").then((item) => item[icon])),
		fi: dynamic(() => import("react-icons/fi").then((item) => item[icon])),
		gi: dynamic(() => import("react-icons/gi").then((item) => item[icon])),
	};

	const IconPlaceHolder = family && icon ? icons[family] : null;

	if (!IconPlaceHolder) return <></>;

	return <IconPlaceHolder {...rest} />;
};

export default Icon;
