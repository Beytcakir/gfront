import { config } from "./config";

export const capitalizeFirstLetter = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getGenderValues = () => {
	return config.genders.map((item) => item.value);
};

export const getTermValues = () => {
	return config.educationTerms.map((item) => item.value);
};

export const getDayValues = () => {
	return config.days.map((item) => item.value);
};

export const formatTerm = (val) => {
	const term = config.educationTerms.find((item) => item.value === val.term);
	return term.label;
};

export const wait = (delay = 5) =>
	new Promise((resolve) => setTimeout(resolve, delay * 1000));
