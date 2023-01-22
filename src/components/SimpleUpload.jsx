import React from 'react'
import lighthouse from '@lighthouse-web3/sdk';

function SimpleUpload() {

    const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
      };
    
      const deploy = async(e) =>{
        // Push file to lighthouse node
        const output = await lighthouse.upload(e, "4d7a0a31-72e4-4363-93c7-f6cc0d7e4a21", progressCallback);
        console.log('File Status:', output);
        /*
          output:
            {
              Name: "filename.txt",
              Size: 88000,
              Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
            }
          Note: Hash in response is CID.
        */
    
          console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
      }





  return (

    <>
    <div>Simple Upload</div>
    <input onChange={e=>deploy(e)} type="file" />
    </>
  )
}

export default SimpleUpload