import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import GroupInfo from "./sidenav/groups/group-info";

type Props = {
  children: React.ReactNode;
};

const GroupMessageDD: React.FC<Props> = ({ children }) => {
  return (
    <Popover size={"sm"} direction="ltr">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent padding={"10px"} width={"fit"}  marginLeft={'15px'}>
        <PopoverCloseButton />
        <PopoverBody padding={"0px"}>
          <section className="bg-white/50 rounded-md px-5 bordery">
            <GroupInfo />
          </section>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default GroupMessageDD;
