import { 
  Card, 
  Col,
} from 'react-bootstrap';
import { 
  BsPersonCircle,
} from "react-icons/bs";

const LetterCard = (props) => {
  const getDate = (time) => {
    var date = new Date(time * 1000);
    return date.getFullYear();
  }

  const shortTx = (tx) => {
    let prefix = tx.substring(0, 5);
    let suffix = tx.substring(tx.length - 4);
    let short = prefix + "..." + suffix;
    return short;
  }
  return (
    <Col xs={12} md={6} className='mt-4'>
      <Card>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            <BsPersonCircle/> {' '}
            {props.letter.data.sender}
            {props.address.toLowerCase() === props.letter.data.sender.toLowerCase() ? ' (Me)' : ''}
          </Card.Subtitle>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <Card.Text style={{fontSize: '16px'}}>{props.letter.data.content}</Card.Text>
              <footer className="blockquote-footer">
                <small>From <cite title="Source Title">{getDate(props.letter.data.time)}</cite></small>
              </footer>
            </blockquote>
          </Card.Body>
          <Card.Body className="text-end py-0">
            <Card.Link href={'https://rinkeby.etherscan.io/tx/' + props.letter.data.hash} target="_blank">
              Scan: {shortTx(props.letter.data.hash)}
            </Card.Link>
          </Card.Body>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default LetterCard;