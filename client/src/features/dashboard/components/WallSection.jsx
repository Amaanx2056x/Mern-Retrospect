import React, { useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNote } from "../dashboardSlice";
import CustomCard from "./CustomCard";

const WallSection = ({ title, code, notes }) => {
  let dispatch = useDispatch();
  let filtered = notes.filter((itm) => itm.category == code);
  let [newNote, setNewNote] = useState({ body: "", category: code });
  let [load, setLoad] = useState(false);
  let [showNewCard, setShowNewCard] = useState(false);

  let adddNewItem = (e) => {
    if (e.keyCode === 13) {
      dispatch(addNote(newNote, setLoad));
      setShowNewCard(false);
      setNewNote((prev) => ({ ...prev, body: "" }));
    }
  };
  return (
    <Card className="m-3 wallsection-card">
      <Card.Body>
        <Card.Title>
          {title}
          <span className="m-2" onClick={() => setShowNewCard(true)}>
            <i class="bi bi-plus-circle"></i>
          </span>
        </Card.Title>
        <Card.Text>
          <Row>
            {showNewCard && !load && (
              <Col md={4}>
                <Card className={`m-3 note-card-${code}`}>
                  <Card.Body>
                    <Card.Text className="custom-card-text">
                      <input
                        autoFocus
                        size={15}
                        type="text"
                        className="note-input"
                        value={newNote.body}
                        onChange={(e) =>
                          setNewNote((prev) => ({
                            ...prev,
                            body: e.target.value,
                          }))
                        }
                        onKeyUp={(e) => adddNewItem(e)}
                        onBlur={() => setShowNewCard(false)}
                      />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
            {showNewCard && load && <Spinner />}
            {filtered.map((itm) => (
              <Col md={4} key={itm._id}>
                <CustomCard item={itm} />
              </Col>
            ))}
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WallSection;
