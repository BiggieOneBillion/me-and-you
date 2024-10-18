import { signupSchema } from "../validations/authvalidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWindowSize } from "@reactuses/core";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { api } from "../utils/api-settings";

interface formData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  handleSignIn: () => void;
}

export default function useSignUp({ handleSignIn }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(signupSchema),
  });

  const { width } = useWindowSize();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const onSubmit: SubmitHandler<formData> = async (value: formData) => {
    const { confirmPassword, ...others } = value;

    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", others);
      if (response.status === 201) {
        toast({
          position: "top-right",
          status: "success",
          title: "Operation Successful",
          description: "Account Created Successfully",
          duration: 1500,
        });
        setIsLoading(false);
        setTimeout(() => {
          handleSignIn();
        }, 1500);
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast({
          position: "top",
          status: "error",
          title: "Sign-In Failed",
          description: error?.response?.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        toast({
          position: "top",
          status: "error",
          title: "Sign-In Failed",
          description: "Network Error,  Please check your internet connection",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        toast({
          position: "top",
          status: "error",
          title: "Sign-In Failed",
          description: "Our Fault, Please try again later ",
        });
      }
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    errors,
    register,
    width,
    isLoading,
    onSubmit,
  };
}
