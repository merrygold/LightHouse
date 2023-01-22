import React from "react";
import DecryptFile from "./components/DecryptFile";
import EncryptedUpload from "./components/EncryptedUpload";
import SharePrivateFile from "./components/SharePrivateFile";
import SimpleUpload from "./components/SimpleUpload";


function App() {

  return (
    <div className="App">
     <SimpleUpload />
     <EncryptedUpload />
     <DecryptFile />
     <SharePrivateFile />
    </div>
  );
}

export default App;