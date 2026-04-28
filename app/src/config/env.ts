require('dotenv').config();

const isBlank = (value: any) => value === undefined || value === null || value === '';

const getNumber = (name: string, fallback:any) => {
    const value = process.env[name];
    if (isBlank(value)) {
        if (fallback !== undefined) {
            return fallback;
        }
        throw new Error(`Missing required environment variable: ${name}`);
    }
}

module.exports = {
    PORT : getNumber('PORT', 3000)
}