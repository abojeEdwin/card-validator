import dotenv from 'dotenv';

dotenv.config();

const isBlank = (value: unknown) => value === undefined || value === null || value === '';

const getNumber = (name: string, fallback?: number): number => {
  const raw = process.env[name];
  if (isBlank(raw)) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${name}`);
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Environment variable ${name} must be a valid number. Received: ${raw}`);
  }

  return parsed;
};

export const env = {
  PORT: getNumber('PORT', 3000),
};
