import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import useMessageInput from "../../hooks/useMessageInput";



export default function MessageInput() {

  const { handleSendMessage, newMessage, setNewMessage } = useMessageInput();

  return (
    <InputGroup size="lg">
      <Input
        pr="4.5rem"
        type={"text"}
        placeholder="Enter password"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <InputRightElement width="4.5rem" marginRight={"3"}>
        <Button
          rightIcon={<MdSend />}
          h="1.75rem"
          size="sm"
          onClick={handleSendMessage}
        >
          send
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
