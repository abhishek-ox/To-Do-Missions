import React from "react";
import styled from "styled-components";
import InputContainer from "./InputContainer";

const Contain = () => {
  return (
    <div>
      <Container>
        <div className="heading-input">
          <h1>To Do Missions...🥷</h1>
        </div>
      </Container>
      <InputContainer />
    </div>
  );
};

export default Contain;

const Container = styled.div`
  display: flex;
  align-items: center;
  font-family: "Roboto Mono", monospace;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;

  .heading-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    color: white;
    font-size: 60px;
  }
`;
