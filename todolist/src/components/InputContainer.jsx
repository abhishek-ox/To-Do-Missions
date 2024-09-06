import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdDelete, MdArrowDropDownCircle } from "react-icons/md";

const InputContainer = () => {
  const [missions, setMissions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showTimestamps, setShowTimestamps] = useState({});

  // Fetch existing tasks from the backend
  const fetchMissions = async () => {
    try {
      const response = await fetch("http://localhost:3001/api");
      const data = await response.json();
      setMissions(data);
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  };

  useEffect(() => {
    fetchMissions(); // Fetch missions on component mount
  }, []);

  // Function to add a new mission
  const handleAddMission = async () => {
    if (inputValue.trim()) {
      try {
        const response = await fetch("http://localhost:3001/api/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputValue.trim() }),
        });
        const newMission = await response.json();
        setMissions([...missions, newMission]); // Append the new mission
        setInputValue(""); // Clear the input field
      } catch (error) {
        console.error("Error adding mission:", error);
      }
    }
  };

  // Function to handle Enter key press
  const handlePressKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      handleAddMission();
    }
  };

  // Function to toggle the checkbox status
  const toggleCheckbox = async (index) => {
    const updatedMissions = missions.map((mission, i) =>
      i === index ? { ...mission, checked: !mission.checked } : mission
    );
    setMissions(updatedMissions);

    try {
      const updatedMission = missions[index];
      await fetch(`http://localhost:3001/api/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedMission._id,
          checked: !updatedMission.checked,
        }),
      });
    } catch (error) {
      console.error("Error updating mission:", error);
    }
  };

  // Function to delete a mission
  const handleDelete = async (indexToDelete) => {
    try {
      const response = await fetch(`http://localhost:3001/api/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: missions[indexToDelete]._id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      // Remove the item from the UI after successful deletion
      const updatedMissions = missions.filter(
        (_, index) => index !== indexToDelete
      );
      setMissions(updatedMissions);
    } catch (error) {
      console.error("Error deleting mission:", error);
    }
  };

  // Function to toggle timestamp visibility
  const toggleTimestamp = (id) => {
    setShowTimestamps((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <InputsContainer>
        <input
          className="input-text"
          placeholder="Enter your Mission..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handlePressKey} // Attach handlePressKey function here
        />
        <button onClick={handleAddMission}>ADD</button>
      </InputsContainer>

      <MissionsList>
        {missions.map((mission, index) => (
          <MissionItem key={mission._id}>
            <StyledCheckbox
              type="checkbox"
              checked={mission.checked}
              onChange={() => toggleCheckbox(index)}
            />
            <MissionText checked={mission.checked}>
              {mission.checked ? <strike>{mission.text}</strike> : mission.text}
            </MissionText>
            <MdDeleteIcon onClick={() => handleDelete(index)} />
            <MdArrowDropDownCircleIcon
              onClick={() => toggleTimestamp(mission._id)}
            />
            {showTimestamps[mission._id] && (
              <Timestamp>{mission.timestamp}</Timestamp>
            )}
          </MissionItem>
        ))}
      </MissionsList>
    </div>
  );
};

export default InputContainer;

const InputsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  gap: 25px;

  .input-text {
    color: #343131;
    width: 550px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid cyan;
  }

  .input-text:hover {
    border: 2px solid #ad49e1;
  }

  button {
    padding: 5px 10px;
    font-size: 18px;
    color: black;
    background-color: #9dbdff;
    cursor: pointer;
  }

  button:hover {
    background-color: #ad49e1;
    color: whitesmoke;
  }
`;

const MissionsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 0;
  width: 550px;
  margin: 0 auto;
  margin-top: 20px;
`;

const MissionItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  width: 100%;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 10px;

  &:checked {
    background-color: #6c63ff;
    border-color: #6c63ff;
  }

  &:checked::before {
    content: "✔";
    font-size: 14px;
    color: white;
    position: absolute;
    top: -2px;
    left: 2px;
  }

  &:hover {
    border-color: #6c63ff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px 3px rgba(108, 99, 255, 0.3);
  }
`;

const MissionText = styled.p`
  color: whitesmoke;
  font-size: 22px;
  margin: 0;
  max-width: 450px;
  word-wrap: break-word;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  font-family: "Open Sans", sans-serif;
`;

const MdDeleteIcon = styled(MdDelete)`
  color: #ff6347;
  font-size: 24px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    color: #ff4500;
  }
`;

const MdArrowDropDownCircleIcon = styled(MdArrowDropDownCircle)`
  color: #ed3ef7;
  font-size: 24px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #ad49e1;
  }
`;

const Timestamp = styled.p`
  font-size: 14px;
  color: #fff8e8;
  margin-left: auto;
  font-family: "Open Sans", sans-serif;
`;
