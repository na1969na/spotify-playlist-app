import { Box, Input, Image } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = { isDisabled: boolean };

export const InputFile: React.FC<Props> = ({ isDisabled }) => {
  const [contents, setContents] = useState<string>();

  const onClickChange = () => {
    const element = document.getElementById("input-file");
    element?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    // ファイルがなければ終了
    if (!files || files?.length === 0) return;
    // 先頭のファイルを取得
    const file = files[0];

    const reader = new FileReader();
    // ファイル読み込み完了時に発火するリスナー
    reader.addEventListener("load", () => {
      setContents(
        typeof reader.result === "string" ? reader.result : undefined
      );
      console.log(contents);
    });
    reader.readAsText(file, "UTF-8");
  };

  return (
    <Box>
      {isDisabled ? (
        <Image />
      ) : (
        <Box onClick={onClickChange}>
          <Input
            id="input-file"
            display={"none"}
            type="file"
            accept=".img"
            onChange={handleInputChange}
          />
        </Box>
      )}
    </Box>
  );
};
