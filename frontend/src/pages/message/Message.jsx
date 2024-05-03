import React from "react";
import { Link, useParams } from "react-router-dom";

import "./Message.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Loader from "../../components/loader/Loader";

const Message = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isPending, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  /////////////////////

  const fstId = id.substring(0, 24);

  const scnd = id.substring(24);

  let ourUser;
  let ourGuest;
  currentUser._id === fstId ? ourUser = fstId : ourUser = scnd
  currentUser._id === fstId ? ourGuest = scnd : ourGuest = fstId

  const {
    isPending: pending,
    error: err,
    data: userLocal,
  } = useQuery({
    queryKey: [ourUser],
    queryFn: () =>
      newRequest.get(`/users/${ourUser}`).then((res) => {
        return res.data;
      }),
  });


  const {
    isPending: pendin,
    error: er,
    data: userGuest,
  } = useQuery({
    queryKey: [ourGuest],
    queryFn: () =>
      newRequest.get(`/users/${ourGuest}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link className="link" to="/messages"> MESSAGES </Link>
          <span> { userGuest && userGuest.username } </span>
        </span> 
        {isPending ? (
          <Loader />
        ) : error ? (
          "something went wrong"
        ) : (
          <div className="messages">
            {data.map((message) => (
              <div
                key={message._id}
                className={
                  message.userId === currentUser._id ? "owner item" : "item"
                }
              >
                <img
                  src={
                    message.userId === currentUser._id
                      ? (userLocal && userLocal.img) ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      : (userGuest && userGuest.img) ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt=""
                />
                <p>{message.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            name=""
            placeholder="write a message"
            id=""
            cols={33}
            rows={10}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
