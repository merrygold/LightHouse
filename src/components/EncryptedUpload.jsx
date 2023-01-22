import React from "react";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function EncryptedUpload() {

    const encryptionSignature = async() =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
        const signedMessage = await signer.signMessage(messageRequested);
        return({
          signedMessage: signedMessage,
          publicKey: address
        });
      }
    
      const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
      };
    
      /* Deploy file along with encryption */
      const deployEncrypted = async(e) =>{
        /*
           uploadEncrypted(e, publicKey, accessToken, uploadProgressCallback)
           - e: js event
           - publicKey: wallets public key
           - accessToken: your api key
           - signedMessage: message signed by the owner of publicKey
           - uploadProgressCallback: function to get progress (optional)
        */
        const sig = await encryptionSignature();
        const response = await lighthouse.uploadEncrypted(
          e,
          sig.publicKey,
          "4d7a0a31-72e4-4363-93c7-f6cc0d7e4a21",
          sig.signedMessage,
          progressCallback
        );
        console.log(response);
        /*
          output:
            {
              Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
              Size: "318557",
              Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
            }
          Note: Hash in response is CID.
        */
      }



   return (
    <>
      <div>Encrypted Upload</div>
      <input onChange={e=>deployEncrypted(e)} type="file" />
    </>
  )
}

export default EncryptedUpload