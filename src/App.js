import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 700px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
`;

function App() {
  const [activities, setActivities] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const initialActivities = JSON.parse(
      localStorage.getItem("workout-log-activities")
    );
    const initialHours = JSON.parse(
      localStorage.getItem("workout-log-totalHours")
    );

    setActivities(initialActivities || []);
    setTotalHours(initialHours || 0);
  }, []);

  const saveToLocalStorage = (activities, totalHours) => {
    const activitiesJson = JSON.stringify(activities);

    localStorage.setItem("workout-log-activities", activitiesJson);
    localStorage.setItem("workout-log-totalHours", totalHours);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const itemAttributes = Object.fromEntries(formData);
    const newActivities = [...activities, itemAttributes];
    const newHours = totalHours + Number(itemAttributes.time_spent);

    setActivities(newActivities);
    setTotalHours(newHours);

    saveToLocalStorage(newActivities, newHours);

    form.reset();
  };

  const removeActivity = (activity) => {
    const indexToRemove = activities.indexOf(activity);

    if (indexToRemove !== -1) {
      const newActivities = [
        ...activities.slice(0, indexToRemove),
        ...activities.slice(indexToRemove + 1, activities.length),
      ];
      const newHours = totalHours - activity.time_spent;

      setActivities(newActivities);
      setTotalHours(newHours);

      saveToLocalStorage(newActivities, newHours);
    }
  };

  return (
    <AppContainer>
      <Title>Workout Log</Title>
      <Form onSubmit={onSubmit} />

      <Table activities={activities} removeActivity={removeActivity} />

      <Title>{totalHours} hour(s) of Exercise</Title>
    </AppContainer>
  );
}

export default App;
