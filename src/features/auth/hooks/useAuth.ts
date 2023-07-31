import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useAuth() {
  const router = useRouter();

  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    setUserLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const firebaseAuth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      // 로그인 유지 설정 - LocalStorage 사용
      await setPersistence(firebaseAuth, browserLocalPersistence);

      // 로그인 이후 유저 정보를 반환 (가입되어 있지 않으면 firebase 내에서 가입 후 반환)
      const credential: UserCredential = await signInWithPopup(
        firebaseAuth,
        provider
      );

      // 로그인 성공 시 토스트 메시지 출력
      toast.success(`Welcome ${credential.user?.displayName}`);

      // 로그인 성공 시 페이지 이동
      router.push("/gallery");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        // 로그인 실패 시 토스트 메시지 출력
        toast.error(`[${error.code}] 로그인에 실패했습니다.`, {
          toastId: error.code,
        });

        return;
      }

      toast.error(`로그인에 실패했습니다.`, {
        toastId: "login-fail",
      });
    }
  };

  const logout = async () => {
    try {
      const firebaseAuth = getAuth();
      await firebaseAuth.signOut();
      await router.push("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(`[${error.code}] 로그아웃에 실패했습니다.`, {
          toastId: error.code,
        });
        return;
      }
      toast.error(`로그아웃에 실패했습니다.`, {
        toastId: "logout-fail",
      });
    }
  };

  return {
    user,
    userLoading,
    loginWithGoogle,
    logout,
  };
}
