import React from "react";
import { VStack, FormControl, FormHelperText, Button } from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiUser } from "react-icons/pi";
import InputContainer from "./InputContainer";
import useSignUp from "../../hooks/useSignUp";

interface Props {
  handleSignIn: () => void;
}

const SignUp: React.FC<Props> = ({ handleSignIn }) => {
  
  const { handleSubmit, errors, register, width, isLoading, onSubmit } =
    useSignUp({ handleSignIn });

  return (
    <section className="border text-[#31473A] rounded-md py-10 mx-2 px-4 md:px-12 max-w-[700px] bg-[#FDFBF9] lg:w-[500px] min-w-[350px] space-y-5 md:space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-medium">Register</h1>
        <p className="text-sm text-black/60">
          Already have an account?{" "}
          <button onClick={handleSignIn} className="underline">
            Sign In
          </button>
        </p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <VStack spacing={width > 760 ? 6 : 3} align={"stretch"}>
          {/* email */}
          <InputContainer
            register={register}
            type="email"
            icon={<HiOutlineMail />}
            inputname="email"
            placeholder="Enter your email"
            error={errors.email}
          />
          {/* name */}
          <InputContainer
            register={register}
            type="text"
            icon={<PiUser />}
            inputname="name"
            placeholder="Enter your name"
            error={errors.name}
          />

          {/* Password */}
          <FormControl>
            <InputContainer
              register={register}
              type="password"
              icon={<RiLockPasswordLine />}
              inputname="password"
              placeholder="Enter your password"
              error={errors.password}
            />
            <FormHelperText fontSize={"12px"}>
              Password should contain atleast 6 characters
            </FormHelperText>
          </FormControl>
          {/* Confirm Password */}
          <InputContainer
            register={register}
            type="password"
            icon={<RiLockPasswordLine />}
            inputname="confirmPassword"
            placeholder="Confirm your password"
            error={errors.confirmPassword}
          />
        </VStack>
        <div className="flex justify-end">
          <Button
            type="submit"
            size={"lg"}
            bgColor={"#222526"}
            textColor={"white"}
            padding={"0 40px"}
            isLoading={isLoading}
            loadingText="Processing"
          >
            <span className="text-[15px]">Sign Up</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
