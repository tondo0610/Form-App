import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

import Declaration from "./Declaration";
const Table = () => {
  return (
    <div>
      <Container>
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1>Vietnam Health Declaration for foreign entry</h1>
        </div>

        <Link to="/Declaration">
          <Button color="success" type="button">
            New form
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Table;
