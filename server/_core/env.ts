export const ENV = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID ?? "",
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? "",
  firebasePrivateKey: (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
  ownerAuthSubject: process.env.OWNER_AUTH_SUBJECT ?? "",
  whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN ?? "",
  whatsappAppSecret: process.env.WHATSAPP_APP_SECRET ?? "",
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID ?? "",
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN ?? "",
  corsOrigins: (process.env.CORS_ORIGINS ?? process.env.APP_URL ?? "http://localhost:5173")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean),
  isProduction: process.env.NODE_ENV === "production",
};
