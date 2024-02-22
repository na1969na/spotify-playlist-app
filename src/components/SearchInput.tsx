import { Search2Icon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import React from "react";

export const SearchInput: React.FC = () => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="white" />}
      />
      <Input
        placeholder="playlist"
        borderRadius={5}
        border={"none"}
        bgColor={"gray.600"}
        focusBorderColor="none"
        // value={inputValue}
        // onChange={handleInputChange}
        // onBlur={showAllPlaylists}
      />
    </InputGroup>
  );
};
