import Header from "../components/Header";
import Login from "../components/FormComponent/Login";

export default function LoginPage() {
  return (

    <div className="h-screen flex flex-col">
<div className="flex-grow flex items-center justify-center">
  
      <div className="flex justify-center flex-col">
        <div>
          <Header
            heading="Login to your account"
            paragraph="Don't have an account?"
            linkName="Sign up"
            linkUrl="#"
            />
        </div>
        <div>
          <Login />
        </div>
            </div>
</div>
    </div>
  );
}
