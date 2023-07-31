import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (Component: React.FC) => {
  const Wrapper: React.FC = () => {
    const router = useRouter();
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/");
        }
      });
      return () => unsubscribe();
    }, []);

    return <Component />;
  };

  return Wrapper;
};

export default withAuth;
