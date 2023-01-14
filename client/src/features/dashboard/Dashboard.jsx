import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { selectAuth } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import CustomNavBar from "./components/CustomNavBar";
import WallSection from "./components/WallSection";
import { getAllNotes, selectNotes } from "./dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const notes = useSelector(selectNotes);
  let [load, setLoad] = useState(true);
  let nav = useNavigate();
  let sectionData = [
    { title: "What Went Well", code: "allgood" },
    { title: "What can be improved", code: "improvements" },
    { title: "Start doing", code: "start" },
    { title: "Action Items", code: "action" },
  ];

  useEffect(() => {
    if (!auth.value) nav("/");
  }, [auth.value]);

  useEffect(() => {
    dispatch(getAllNotes(setLoad));
  }, []);

  return (
    <Container fluid>
      <CustomNavBar />
      {load ? (
        <Spinner />
      ) : (
        <Row>
          {sectionData.map((itm) => (
            <Col md={6} key={itm.code}>
              <WallSection title={itm.title} code={itm.code} notes={notes} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
