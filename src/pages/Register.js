import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="flex w-[1000px] mx-auto h-full">
        {/* Register form */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
