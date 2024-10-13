const { config } = require('@/helpers/config');

const API_URL = config.api.baseUrl;

export const login = async (payload) => {
    console.log("payload in login in auth-service.js",payload);
    
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log("response in login in auth.js",response);

    return response;
};
