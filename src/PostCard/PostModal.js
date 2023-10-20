import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import "./PostModal.css";

function PostModal({ setShowModal, postId, showModal }) {
  const modalContentRef = useRef(null);
  const param = useParams();

  const [singlePostData, setSinglePostData] = useState({});
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    function getPostData() {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setSinglePostData(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }

    getPostData();
  }, [postId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showModal &&
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        closeModal();
        // console.log("inside", modalContentRef.current);
      }
    };

    if (showModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModal, closeModal]);
  return (
    <div className="custom-modal">
      <div className="modal-content modal-content-custom">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {Object.keys(singlePostData).length > 0 ? (
          <div className="custom-modal-box" ref={modalContentRef}>
            <div className="box-title">
              {singlePostData.id}. {singlePostData.title}
            </div>
            <div className="custom-card-image">
              <img
                src={`https://picsum.photos/450/300?random=${
                  Math.floor(Math.random() * 10) + 1
                }`}
                height="200px"
                width="auto"
              />
            </div>

            <div className="box-content">{singlePostData.body}</div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default PostModal;
