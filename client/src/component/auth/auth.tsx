import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const signIn = () => setIsSignIn(true);
  const signUp = () => setIsSignIn(false);
  return (
    <section className="flex-1 pt-10 md:min-h-screen w-screeny bg-[#EDF4F2]y lg:bg-[#705953]y lg:bg-[#232526] flex flex-col gap-4 justify-center items-center pb-5">
      <h1 className="text-lg px-3 py-1 lg:text-2xl font-medium bg-[#705953]y bg-[#FDFBF9] text-[#d6c3bc]y text-[#232526]  rounded-md ">Riverside Chat</h1>
      <div className="">
      {isSignIn ? (
        <SignIn handleSignUp={signUp} />
      ) : (
        <SignUp handleSignIn={signIn} />
      )}
      </div>
    </section>
  );
};

export default Auth;
