import { signinSchema } from "../validations/authvalidation";
import {
  authStore,
  authType,
  userProp,
  userStore,
} from "../store/global-store";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../utils/api-settings";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWindowSize } from "@reactuses/core";
import { useToast } from "@chakra-ui/react";

interface formData {
  email: string;
  password: string;
}

export default function useSignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formData>({
    resolver: zodResolver(signinSchema),
  });

  const toast = useToast();

  const updateToken = userStore(
    (state: unknown) => (state as userProp).updateToken
  );
  const updateIsAllowed = authStore(
    (state: unknown) => (state as authType).updateIsAllowed
  );

  const { width } = useWindowSize();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<formData> = async (value: formData) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", value);
      if (response.status === 200) {
        toast({
          position: "top",
          status: "success",
          title: "Operation Successful",
          description: "Welcome Back",
          duration: 1500,
        });
        setIsLoading(false);
        // // console.log(response.data);
        // also update the token
        updateToken(response.data.token);
        // set the Allowed variable to true
        updateIsAllowed(true);
        // navigate to the dashboard
        navigate("/chat");
      }
    } catch (error: any) {
      // console.log(error);

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
    register,
    errors,
    handleSubmit,
    width,
    isLoading,
    onSubmit,
  };
}
