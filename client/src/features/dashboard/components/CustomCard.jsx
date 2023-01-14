import React, { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../auth/authSlice";
import { deleteNote, editNote, upvoteNote } from "../dashboardSlice";

const CustomCard = ({ item }) => {
  let dispatch = useDispatch();
  let auth = useSelector(selectAuth);
  let [text, setText] = useState(item.body);
  let [touched, setTouched] = useState(false);
  let [load, setLoad] = useState(false);
  let editItem = (e) => {
    if (e.keyCode === 13) {
      dispatch(editNote({ ...item, body: text }, setLoad));
      setTouched(false);
    }
  };
  let deleteItem = () => {
    dispatch(deleteNote(item._id, setLoad));
  };
  let upvoteItem = () => {
    dispatch(upvoteNote(item, setLoad));
  };
  return load ? (
    <Spinner />
  ) : (
    <Card className={`m-3 note-card-${item.category}`}>
      <Card.Body>
        {touched ? (
          <Card.Text className="custom-card-text">
            <input
              type="text"
              className="note-input"
              autoFocus
              size={15}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyUp={(e) => editItem(e)}
              onBlur={() => setTouched(false)}
            />
          </Card.Text>
        ) : (
          <Card.Text className="custom-card-text">{item.body}</Card.Text>
        )}
        {auth.id == item.createdBy._id && (
          <>
            <span className="m-2">
              <i class="bi bi-pencil" onClick={() => setTouched(true)}></i>
            </span>
            <span className="m-2" onClick={deleteItem}>
              <i class="bi bi-trash"></i>
            </span>
          </>
        )}

        <span className="m-2" onClick={upvoteItem}>
          {item.upvotes.length}
          {item.upvotes.find((i) => i._id == auth.id) ? (
            <i class="bi bi-hand-thumbs-up-fill"></i>
          ) : (
            <i class="bi bi-hand-thumbs-up"></i>
          )}
        </span>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
