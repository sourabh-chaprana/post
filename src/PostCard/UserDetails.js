import React, { useEffect, useState, useRef } from "react";
import Timer from "./Timer";
import { useParams } from "react-router";
import PostModal from "./PostModal";

function UserDetails() {
  const param = useParams();

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [postId, setPostId] = useState([]);

  // for user Data
  useEffect(() => {
    function getUsers() {
      fetch(`https://jsonplaceholder.typicode.com/users/${param.id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }

    getUsers();
  }, [param]);

  // for post Data

  useEffect(() => {
    function getPostData() {
      fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then((response) => response.json())
        .then((data) => {
          setPostData(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }

    getPostData();
  }, []);

  const toggleModal = (e, item) => {
    setShowModal(true);
    setPostId(item.id);
  };

  return (
    <div>
      <div>
        <h2 className="user-details-page">Profile Page</h2>
      </div>
      <Timer />
      <div className="directory-box">
        <h2 className="directory-box-header">User Details </h2>

        <div className="directory-box-listing">
          <div className="directory-box-listing-box">
            <div className="directory-box-listing-box-name">
              <span className="custom-title">User Info</span>
              <p>
                {" "}
                <span className="custom-title">Name ::</span> {userData?.name}
              </p>
              <p>
                {" "}
                <span className="custom-title">Username ::</span>
                {userData?.username}
              </p>
              <p>
                {" "}
                <span className="custom-title">Email ::</span>
                {userData?.email}
              </p>
              <p>
                {" "}
                <span className="custom-title">Phone ::</span>
                {userData?.phone}
              </p>
            </div>
            <div className="directory-box-listing-box-name">
              <span className="custom-title">User Address</span>
              <p>
                {" "}
                <span className="custom-title">City ::</span>
                {userData?.address?.city}
              </p>
              <p>
                {" "}
                <span className="custom-title">Street ::</span>
                {userData?.address?.street}
              </p>
              <p>
                {" "}
                <span className="custom-title">Zipcode::</span>
                {userData?.address?.zipcode}
              </p>
              <p>
                {" "}
                <span className="custom-title">Suite::</span>
                {userData?.address?.suite}
              </p>
            </div>
          </div>
        </div>
        <div className="post-parent-dev">
          <div className="boxes post-boxes">
            {postData.map((item) => (
              <div
                key={item.id}
                className="box"
                onClick={(e) => toggleModal(e, item)}
              >
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url('https://picsum.photos/350/300?random=${item.id}')`,
                  }}
                ></div>
                <div className="box-title">{item.title}</div>
                <div className="box-content">content here !</div>
              </div>
            ))}
          </div>
        </div>

        {showModal && postId ? (
          <PostModal
            setShowModal={setShowModal}
            postId={postId}
            showModal={showModal}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UserDetails;
