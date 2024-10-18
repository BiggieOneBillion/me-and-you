import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MdGroups } from "react-icons/md";
import RemoteSelect from "./remote-select-input";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../utils/api-settings";
import { userProp, userStore } from "../../../../store/global-store";

type formValueType = {
  name: string;
  participants: string[];
};

export default function CreateGroupModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formValues, setFormValues] = useState<formValueType>({
    name: "",
    participants: [],
  });

  const handleFormUpdate = (value: string[]) => {
    setFormValues({ ...formValues, participants: [...value] });
  };

  // console.log(formValues);

  const toast = useToast();

  const queryClient = useQueryClient();

  const token = userStore((state: unknown) => (state as userProp).token);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(
        `chats/create-room`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
    onSuccess: () => {
      toast({
        status: "success",
        position: "top-left",
        title: "User invited successfully",
      });
      onClose(); // close the modal
      queryClient.invalidateQueries({
        queryKey: ["chats-rooms"],
      });
      // userInfo
    },
    onError(error) {
      // console.log(error);
    },
  });

  const handleSubmit = () => {
    if (formValues.name === "" || formValues.participants.length === 0) {
      toast({
        status: "error",
        title: "Error",
        description: "Please fill in all fields",
        position: "top-right",
      });
      return;
    }
    mutation.mutate(formValues);
  };

  if (mutation.isPending) {
    return (
      <div className="fixed top-0 left-0 bg-black/70 h-screen w-screen z-20 flex items-center justify-center">
        <p className="text-lg text-white font-semibold">Processing.....</p>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={onOpen}
        className="text-sm font-medium flex items-center gap-1"
      >
        <span>
          <MdGroups />
        </span>
        <span>Create group</span>
      </button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form className="space-y-4">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdGroups color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Group name"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </InputGroup>
                <FormHelperText fontSize={"13px"}>
                  What is the name of your group?
                </FormHelperText>
              </FormControl>
              {/* select your group members */}
              <FormControl>
                <RemoteSelect handleFormUpdate={handleFormUpdate} />
                <FormHelperText fontSize={"13px"}>
                  Add members to your group - N/b - you can only add from your
                  friends list
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
