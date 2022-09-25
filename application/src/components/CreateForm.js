import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../constants";
import ABI from "../contract/contracts/Letter.sol/Letter.json";
import { 
  Row,
  Col,
  Button,
  Form,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { 
  BsCheck2
} from "react-icons/bs";
import {db} from '../firebase'
import {
  collection, 
  addDoc, 
  Timestamp,
} from 'firebase/firestore'
const CreateForm = (props) => {
  const [content, setContent] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifyContent, setNotifyContent] = useState("");
  
  const toggleNotify = () => setNotify(!notify);
  
  const sendLetter = async () => {
    setSendLoading(true);
    const signer = props.provider.getSigner()
    const letterContract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);
    const tx = await letterContract.create(content)
    const receipt = await tx.wait();
    try {
      addDoc(collection(db, 'history'), {
        hash: receipt.transactionHash,
        sender: receipt.events[0].args[0],
        content: receipt.events[0].args[1],
        time: receipt.events[0].args[2].toNumber(),
        created: Timestamp.now()
      })
    } catch (err) {
      console.warn(err)
    }
    setNotifyContent(receipt.transactionHash);
    setContent('');
    toggleNotify();
    setSendLoading(false);
    props.reload();
  };

  return (
    <Row>
      <Col xs={12}>
        <ToastContainer position='top-end'>
          <Toast show={notify} onClose={toggleNotify} delay={10000} autohide>
            <Toast.Header>
              <BsCheck2 style={{fontSize: '20px'}}/>{' '}
              <strong className="me-auto">Notification</strong>
              <small>just finished</small>
            </Toast.Header>
            <Toast.Body>
              Message sent successfully, 
              txHash: <a href={'https://rinkeby.etherscan.io/tx/' + notifyContent} target="_blank" rel="noreferrer">
                {notifyContent}
              </a>
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} placeholder="Enter a message" value={content || ''} onChange={(e) => setContent(e.target.value)} disabled={sendLoading}/>
          </Form.Group>
          <div className="d-grid">
            <Button variant={sendLoading ? 'warning' : 'success'} type="button" size="lg" onClick={sendLetter} disabled={!content || sendLoading}>
              Send To The Future{sendLoading ? '...' : ''}
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default CreateForm; 