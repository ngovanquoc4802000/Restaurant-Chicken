export const signPromise = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

export const verifyPromise = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });
};