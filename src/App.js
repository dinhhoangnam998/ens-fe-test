import { Button, Box } from "@mui/material";
import ENS, { labelhash } from "@ensdomains/ensjs";
import Web3 from "web3";
import FIFSRegistrar from "./artifacts/@ensdomains/ens-contracts/contracts/registry/FIFSRegistrar.sol/FIFSRegistrar.json";

function App() {
  async function testBKC() {
    const ens = new ENS({ provider: window.ethereum, ensAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3" });
    await ens.name("bkc").createSubdomain("nam");
    await ens.name("nam.bkc").setResolver("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    await ens.name("nam.bkc").setAddress("ETH", "0xc7fBa498f326bA496a991d43aa92bDaD08a07965");
    await ens.name("nam.bkc").setText("Fullname", "Dinh Hoang Nam");

    const onwerAddr = await ens.name("nam.bkc").getOwner();
    const ethAddr = await ens.name("nam.bkc").getAddress();
    const content = await ens.name("nam.bkc").getText("Fullname");
    console.log({ onwerAddr, ethAddr, content });
  }

  async function registrySubDomain() {}

  async function testManageSubDomain() {
    const ens = new ENS({ provider: window.ethereum, ensAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3" });
    const bkcTestOwner = await ens.name("bkc.test").getOwner();
    const ethAddr = await ens.name("bkc.test").getAddress();
    const resolver = await ens.name("bkc.test").getResolver();
    console.log({ bkcTestOwner, ethAddr, resolver });
    // const setResolverResult = await ens.name("bkc.test").setResolver("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    // console.log("🚧 --> testManageSubDomain --> setResolverResult", setResolverResult);
    // const r1 = await ens.name("bkc.test").setAddress("ETH", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    const ethAddrAfter = await ens.name("bkc.test").getAddress();
    console.log("🚧 --> testManageSubDomain --> ethAddrAfter", ethAddrAfter);
  }

  return (
    <Box display="flex" justifyContent={"center"} alignItems="center" height="100vh">
      <Button variant="contained" color="primary" sx={{ mr: 4 }} onClick={() => testBKC()}>
        Test BKC
      </Button>

      <Button variant="contained" color="primary" onClick={() => testManageSubDomain()}>
        Test Registrar
      </Button>
    </Box>
  );
}

export default App;
