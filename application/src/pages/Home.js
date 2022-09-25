import React, { useState } from "react";
import CreateForm from "../components/CreateForm";
import List from "../components/List";

const Home = (props) => {
  const [reloadLetter, setReloadLetter] = useState(false);

  return (
    <div className="Home">
      <CreateForm provider={props.provider} reload={setReloadLetter}/>
      <List provider={props.provider} address={props.address} reload={reloadLetter} />
    </div>
  );
}

export default Home;