import React from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const HoverableLine = styled.tr`
  &:hover {
    & span {
      display: block;
    }
  }
`;

const ActionHeader = styled.td`
  width: 50px;

  & span {
    display: none;
    cursor: pointer;

    &:before {
    content: "\\26D4";
    }
  }

`;

const ActivityTable = ({ activities, removeActivity }) => {
  return (
    <Table bordered striped hover>
      <thead>
        <tr>
          <td>Time</td>
          <td>Type</td>
          <td>Date</td>
          <ActionHeader />
        </tr>
      </thead>
      <tbody>
        {activities.map((activity, index) => (
          <HoverableLine key={index}>
            <td>{activity.time_spent}</td>
            <td>{activity.activity}</td>
            <td>{activity.date}</td>
            <ActionHeader>
              <span onClick={() => removeActivity(activity)}></span>
            </ActionHeader>
          </HoverableLine>
        ))}
      </tbody>
    </Table>
  );
};

export default ActivityTable;
