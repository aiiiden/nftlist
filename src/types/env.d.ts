declare namespace NodeJS {
  interface ProcessEnv {
    // FIREBASE CLIENT CONFIG
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_DB_URL: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;

    // GOOGLE OATH CONFIG
    NEXT_PUBLIC_GOOGLE_OATH_CLIENT_ID: string;

    // NFT STORAGE CONFIG
    NEXT_PUBLIC_NFT_STORAGE_API_KEY: string;
  }
}
