import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="flex w-[1000px] mx-auto h-full">
        {/* Login form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
