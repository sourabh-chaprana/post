import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function SinglePost() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    function getUsers() {
      fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => response.json())
        .then((data) => {
          setPostData(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }

    getUsers();
  }, []);

  const reDirectFunc = (e, item) => {
    navigate(`userdetails/${item.id}`);
  };

  return (
    <div>
      <section>
        <div className="directory-box">
          <h2 className="directory-box-header">Directory</h2>
          {postData.map((item) => (
            <div
              className="directory-box-listing"
              onClick={(e) => reDirectFunc(e, item)}
              key={item.id}
            >
              <div className="directory-box-listing-box">
                <div className="directory-box-listing-box-name">
                  <span className="custom-title">Name:</span>
                  <span>{item.name}</span>
                </div>
                <div className="directory-box-listing-box-name">
                  <span className="custom-title">Posts:</span>
                  <span>{item.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SinglePost;
