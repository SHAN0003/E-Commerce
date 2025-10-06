import React, { useEffect } from "react";
import { useState } from "react";
import "./Users.scss";
import cross_icon from "../../assets/cross_icon.png"

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  const userInfo = async () => {
    await fetch("http://localhost:4000/signup")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  };

  useEffect(()=>{
    userInfo();
  }, []);

  const remove_user =async (email) => {
    await fetch("http://localhost:4000/removeuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },        
      body: JSON.stringify({email: email})
    })
    await userInfo();
  }

  return (
    <div className="users">
      <h1>All Users List ({allUsers.length})</h1>
      <div className="listusers-format-main text">
        <p>User's Name</p>
        <p>User's Email</p>
        <p>Remove User</p>
      </div>

      <div className="listusers-allUsers">
        <hr />
        {allUsers.map((user, index)=>{
          return <>
          <div key={index} className="listusers-format-main listusers-format">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <img onClick={()=>{remove_user(user.email)}} src={cross_icon} alt="" className="listusers-remove-icon" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
    
  );
};

export default Users;
