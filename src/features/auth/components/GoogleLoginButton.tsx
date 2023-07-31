import useAuth from "../hooks/useAuth";

const GoogleLoginButton: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  return <button onClick={loginWithGoogle}>Google Login</button>;
};

export default GoogleLoginButton;
