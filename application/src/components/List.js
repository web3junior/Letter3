import React, { useState, useEffect } from "react";
import { 
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import {db} from '../firebase'
import {
  collection,
  query, orderBy, onSnapshot, limit, startAfter, endBefore, limitToLast
} from 'firebase/firestore'
import LetterCard from "../components/LetterCard";

const List = (props) => {
  const [letters, setLetters] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const [page, setPage] = useState(1);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const perpage = 10;

  const getLetter = async () => {
    onSnapshot(query(
      collection(db, 'history')
    ), (querySnapshot) => {
      const _totalItem = querySnapshot.size;
      const _totalPage = Math.ceil(_totalItem / perpage);
      setTotalItem(_totalItem);
      setPageSize(_totalPage);
    })

    const q = query(
      collection(db, 'history'), 
      orderBy('created', 'desc'), 
      limit(perpage)
    );
    onSnapshot(q, (querySnapshot) => {
      setLetters(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
      setTo(querySnapshot.size)
    })
  };

  useEffect(() => {
    getLetter();
  }, [props.provider, props.reloadLetter]); // eslint-disable-line react-hooks/exhaustive-deps

  const previousPage = async (item) => {
    if(page === 1) return false;
    const q = query(
      collection(db, 'history'), 
      orderBy('created', 'desc'), 
      limitToLast(perpage),
      endBefore(item.data.created)
    );
    onSnapshot(q, (querySnapshot) => {
      setLetters(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
      const _page = page - 1;
      const _from = from - perpage;
      const _to = _from + (querySnapshot.size-1)
      setFrom(_from)
      setTo(_to)
      setPage(_page)
    })
  }

  const nextPage = async (item) => {
    if(page === pageSize) return false;
    const q = query(
      collection(db, 'history'), 
      orderBy('created', 'desc'), 
      limit(perpage),
      startAfter(item.data.created)
    );
    onSnapshot(q, (querySnapshot) => {
      setLetters(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
      const _page = page + 1;
      const _from = from + perpage;
      const _to = _from + (querySnapshot.size-1)
      setFrom(_from)
      setTo(_to)
      setPage(_page)
    })
  }

  return (
    <div className="List">
      <Row>
      {letters.map((item, index) => 
        <LetterCard letter={ item } key={index} address={props.address} />
      )}
      </Row>
      {letters.length > 0 ?
      <Row className="my-4">
        <Col xs>
          <Button variant="light" onClick={() => previousPage(letters[0]) }>Last</Button>
        </Col>
        <Col xs className="text-center mt-2">Showing {from} to {to} of {totalItem} messages</Col>
        <Col xs className="text-end">
          <Button variant="light" onClick={() => nextPage(letters[letters.length - 1])}>Next</Button>
        </Col>
      </Row> : 
      <Row className="my-4">
        <Col className="text-center">
          Wait for data to loading...
        </Col>
      </Row>
      }
    </div>
  );
}

export default List;