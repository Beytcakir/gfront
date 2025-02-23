import { auth } from "@/auth";
import { config } from "@/helpers/config";

export const getAuthHeader = async () => {
    const session = await auth();
    const token = session?.accessToken;

    let authHeader = {
        'Content-Type': 'application/json'
    };

    if (token) {
        authHeader = {
            Authorization: `Bearer ${token}`,
            ...authHeader
        };
    }

    return authHeader;
};

//
const parseJWT = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        console.error('Error during parsing JWT:', error);
        return null;
    }
};

export const getIsTokenValid = (token) => {
    if (!token) return false;

    const jwtExpireTimeStamp = parseJWT(token).exp;
    // JWT token larin exp degeri SANIYE cinsinden olur.

    const jwtExpireDateTime = new Date(jwtExpireTimeStamp * 1000);
    // new Date kendisine verilen MILISANIYE cinsinden degerden bir tarih saat olusturmek icin bu degeri 1 Ocak 1970 tarihine ekleyeerk yeni bir tarih elde eder.

    return jwtExpireDateTime > new Date();
};

export const getIsUserAuthorized = (role, url) => {
    const userRight = config.userRightsOnRoutes.find((item) =>
        item.urlRegex.test(url)
    );

    if (!userRight) return false;

    return userRight.roles.includes(role);
};

