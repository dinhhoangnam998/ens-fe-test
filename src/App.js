import { Button, Box } from "@mui/material";
import ENS, { labelhash } from "@ensdomains/ensjs";
import Web3 from "web3";
import FIFSRegistrar from "./artifacts/@ensdomains/ens-contracts/contracts/registry/FIFSRegistrar.sol/FIFSRegistrar.json";
import ENSRegistry from "./artifacts/@ensdomains/ens-contracts/contracts/registry/ENSRegistry.sol/ENSRegistry.json";
import { useEffect, useState } from "react";

import {} from "@oceanprotocol/lib";
const registryAddr = "0x3Eb5102C422D2500958822844679c460a3b539f0";
const resolverAddr = "0xa1dC3229c4eC24A2E6bCa7c1D69C146Bea8A2dE5";
const registrarAddr = "0x1e47DB9e06C12cFe9E43AB5392BdE93BC58cF974";
const reverseAddr = "0x4ddc05F9CE4413CA37612B580e2e69787c98a964";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";


function App() {
  // const [accountAddress, setAccountAddress] = useState();

  // useEffect(() => {
  //   async function requestAccount() {
  //     const web3 = new Web3(window.ethereum);
  //     const accs = await web3.eth.requestAccounts();
  //     setAccountAddress(accs[0]);
  //   }
  //   requestAccount();
  // }, []);

  async function testBKC() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const ens = new ENS({ provider: window.ethereum, ensAddress: registryAddr });
    // await ens.name("bkc").createSubdomain("nam");
    // await ens.name("duc.bkc").setResolver(resolverAddr);
    // await ens.name("bkc").setSubnodeRecord("duc", accounts[0], resolverAddr);
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
    // await ens.name("duc.bkc").setAddress("ETH", "0xc7fBa498f326bA496a991d43aa92bDaD08a07965");
    // await ens.name("duc.bkc").setText("Fullname", "Dinh Hoang Nam");
    const onwerAddr = await ens.name("duc.bkc").getOwner();
    const ethAddr = await ens.name("duc.bkc").getAddress();
    const content = await ens.name("duc.bkc").getText("Fullname");
    console.log({ onwerAddr, ethAddr, content });
  }

  async function registrySubDomain() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const registrar = new web3.eth.Contract(FIFSRegistrar.abi, registrarAddr);
    const result = await registrar.methods.register(labelhash("alice"), accounts[0]).send({ from: accounts[0] });
    const ens = new ENS({ provider: window.ethereum, ensAddress: registryAddr });
    const setResolverResult = await ens.name("alice.blcny").setResolver(resolverAddr);
  }

  async function testManageSubDomain() {
    const ens = new ENS({ provider: window.ethereum, ensAddress: registryAddr });
    // const r1 = await ens.name("alice.blcny").setAddress("ETH", "0x00966B82E1bB20f03cFa76d11112792c785E508a");
    const johnBLCNYOwner = await ens.name("alice.blcny").getOwner();
    const ethAddr = await ens.name("alice.blcny").getAddress();
    const resolver = await ens.name("alice.blcny").getResolver();
    console.log({ johnBLCNYOwner, ethAddr, resolver });
  }

  return (
    <Box display="flex" justifyContent={"center"} alignItems="center" height="100vh">
      {/* <Button variant="contained" color="primary" sx={{ mr: 4 }} onClick={() => initOwner()}>
        Init reNFT BKC
      </Button> */}

      <Button variant="contained" color="primary" sx={{ mr: 4 }} onClick={() => testBKC()}>
        Test BKC
      </Button>
      <Button variant="contained" color="primary" sx={{ mr: 4 }} onClick={() => registrySubDomain()}>
        Test Registry SubDomain
      </Button>

      <Button variant="contained" color="primary" onClick={() => testManageSubDomain()}>
        Test Manage SubDomain
      </Button>
    </Box>
  );
}

export default App;
