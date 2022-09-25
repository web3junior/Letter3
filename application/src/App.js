import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Button,
  Container,
  Row,
  Col,
  Navbar,
} from 'react-bootstrap';
import Home from "./pages/Home";

function App() {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [notify, setNotify] = useState("");

  const login = () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(async (resp) => {
        setAddress(resp[0]);
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await _provider.getNetwork();
        setNotify("");
        if(chainId !== 4){
          setNotify("PLEASE CONNECT WITH RINKEBY TESTNET!");
        }
        setProvider(_provider);
      });
  };

  const shortAddress = (addr) => {
    let prefix = addr.substring(0, 5);
    let suffix = addr.substring(addr.length - 4);
    let short = prefix + "..." + suffix;
    return short;
  };

  useEffect(() => {
    if(!window.ethereum){
      setNotify("PLEASE INSTALL <a href='https://metamask.io/download/' target='_blank'>METAMASK</a> EXTENSION!");
    } else {
      window.ethereum.on("chainChanged", () => {
        login();
      });
    
      window.ethereum.on("accountsChanged", () => {
        login();
      });

      if(!provider){
        login();
      }
    }
  }, [provider]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <Navbar>
              <Container>
                <Navbar.Brand>
                  <img
                    alt="logo"
                    src="/send.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
                  Future-Message
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    {address ? 
                      <span>
                        Signed in as: <a href="#login">{shortAddress(address)}</a>
                      </span>
                      : 
                      <Button variant="outline-success" onClick={login}>Sign in</Button>
                    }
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <hr className="mt-0"/>
          </Col>
        </Row>
      </Container>
      <Container>
        <h3 className="text-center" dangerouslySetInnerHTML={{__html: notify}} />
        <Home provider={provider} address={address}/>
      </Container>
    </div>
  );
}

export default App;
