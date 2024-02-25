import { Box } from "@chakra-ui/react";
import React, { ChangeEvent, useContext } from "react";
import { StoreContext } from "../utils/DataStoreContext";
import { reducerCases } from "../utils/Constants";
import { PlaylistDetail } from "../types/SpotifyApi";

export const Footer: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  const fileName = "jsonファイル";

  const fileNameWithJson = `${fileName}.json`;
  const blobData = new Blob([JSON.stringify(state.playlistDetail)], {
    type: "text/json",
  });
  const jsonURL = URL.createObjectURL(blobData);
  const aaaaa : PlaylistDetail = {"id":"4wMMZPGuEfLRLEJywT0hf5","name":"nice","description":"","image":"https://mosaic.scdn.co/640/ab67616d00001e020176d825eea0b946e228f2f2ab67616d00001e026b35d93fc653a21ec2ebec95ab67616d00001e029b92abb6aa071bdba8870e3fab67616d00001e02c681f83ef5bd671909982135","owner":"Nana Okamoto","tracks":[{"id":"02uLriYYqR6Dcnn8Q43ENP","name":"Hug.m4a","artists":["羊文学"],"image":"https://i.scdn.co/image/ab67616d000048510176d825eea0b946e228f2f2","duration":64586,"albumName":"12 hugs (like butterflies)","albumUri":"spotify:album:1wNDOs0Zmqrm7dhgnneflC","trackNumber":1},{"id":"5MNCIcHfHsH3BQCEsFc7R0","name":"SHOZEN","artists":["家主"],"image":"https://i.scdn.co/image/ab67616d000048516b35d93fc653a21ec2ebec95","duration":222937,"albumName":"石のような自由","albumUri":"spotify:album:4Fmt0D1UfjV3s4SAnP7cep","trackNumber":1},{"id":"1cMqlaNP7zoTbp8Xerp8em","name":"涙を隠して(Boys Don't Cry)","artists":["Cody・Lee(李)"],"image":"https://i.scdn.co/image/ab67616d000048519b92abb6aa071bdba8870e3f","duration":276666,"albumName":"涙を隠して(Boys Don't Cry)","albumUri":"spotify:album:4JeWP56kr9EVljgX76I0sw","trackNumber":1},{"id":"1xbEhoNkh3qcdMXVv0NDxe","name":"酒を飲んでも神には成れない","artists":["Mega Shinnosuke"],"image":"https://i.scdn.co/image/ab67616d00004851c681f83ef5bd671909982135","duration":127250,"albumName":"ロックはか゛わ゛い゛い゛","albumUri":"spotify:album:2q9ug8Pt4cCbO4PLLXygXq","trackNumber":6},{"id":"3WwVj7oXQqCDxIG55wPN3r","name":"GIRL AND","artists":["カネヨリマサル"],"image":"https://i.scdn.co/image/ab67616d0000485131f17aad58bbdbd650739b1f","duration":202000,"albumName":"波打つ心を持ちながら","albumUri":"spotify:album:4gINtRCG56pnyFd60pRNPp","trackNumber":2},{"id":"2WteyxKwXDUMHKSpc9GnnN","name":"105☻","artists":["Chilli Beans."],"image":"https://i.scdn.co/image/ab67616d00004851892e53865f739ac18d9c1420","duration":205575,"albumName":"Welcome to My Castle","albumUri":"spotify:album:7gkjbmsbhiXCDPmKYGPk2l","trackNumber":10},{"id":"7lguEOeTqynpWzeqPaXk9t","name":"aaa","artists":["Chilli Beans."],"image":"https://i.scdn.co/image/ab67616d00004851892e53865f739ac18d9c1420","duration":211034,"albumName":"Welcome to My Castle","albumUri":"spotify:album:7gkjbmsbhiXCDPmKYGPk2l","trackNumber":4}]};

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("ファイルを選択して下さい");
      return;
    }

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      try {
        dispatch({
          type: reducerCases.SET_PLAYLISTS,
          payload: JSON.parse(content as string),
        });
      } catch (error) {
        console.error("JSONファイルを解析できませんでした。", error);
      }
    };
    reader.readAsText(file);
  };
  return (
    <Box bg={"#181818"} h={"100%"}>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <a href={jsonURL} download={fileNameWithJson}>
　　エクスポート
　</a>
    </Box>
    
  );
};
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
