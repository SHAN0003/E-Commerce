import React from 'react'
import { useState } from 'react'
import "./SCSS/LoginSignup.scss"

const LoginSignup = () => {

  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const login = async () => {
    console.log("Login function executed", formData);

    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data);

    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.error)
    }

  }

  const signup = async () => {
    console.log("Signup function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data);

    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.error)
    }

  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login(): signup()}}>Continue</button>
        {state === "Sign Up" ? <p>Already have an account? <span onClick={() => {setState("Login")}}>Login here</span></p> : <p>Create an account? <span onClick={() =>{setState("Sign Up")}}>Click here</span></p> }
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to  the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup






// import React, { useState } from 'react';
// import './SCSS/LoginSignup.scss';

// const LoginSignup = () => {
//   const [state, setState] = useState("Login");
//   const [forgotPassword, setForgotPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     email: ""
//   });

//   const changeHandler = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const login = async () => {
//     console.log("Login function executed", formData);

//     let responseData;
//     await fetch("http://localhost:4000/login", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     }).then((response) => response.json()).then((data) => responseData = data);

//     if(responseData.success){
//       localStorage.setItem("auth-token", responseData.token);
//       window.location.replace("/");
//     } else {
//       alert(responseData.error);
//     }
//   };

//   const signup = async () => {
//     console.log("Signup function executed", formData);

//     let responseData;
//     await fetch("http://localhost:4000/signup", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     }).then((response) => response.json()).then((data) => responseData = data);

//     if(responseData.success){
//       localStorage.setItem("auth-token", responseData.token);
//       window.location.replace("/");
//     } else {
//       alert(responseData.error);
//     }
//   };

//   const forgotPasswordHandler = async () => {
//     console.log("Forgot Password function executed", formData);

//     let responseData;
//     await fetch("http://localhost:4000/forgot-password", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: formData.email }),
//     }).then((response) => response.json()).then((data) => responseData = data);

//     if(responseData.success){
//       alert("Password reset email sent!");
//       setForgotPassword(false);
//     } else {
//       alert(responseData.error);
//     }
//   };

//   return (
//     <div className='loginsignup'>
//       <div className="loginsignup-container">
//         {forgotPassword ? (
//           <div className="forgot-password">
//             <h1>Forgot Password</h1>
//             <input
//               name="email"
//               value={formData.email}
//               onChange={changeHandler}
//               type="email"
//               placeholder='Email Address'
//             />
//             <button onClick={forgotPasswordHandler}>Send Reset Link</button>
//             <p onClick={() => setForgotPassword(false)}>Back to {state}</p>
//           </div>
//         ) : (
//           <>
//             <h1>{state}</h1>
//             <div className="loginsignup-fields">
//               {state === "Sign Up" && (
//                 <input
//                   name="username"
//                   value={formData.username}
//                   onChange={changeHandler}
//                   type="text"
//                   placeholder='Your Name'
//                 />
//               )}
//               <input
//                 name="email"
//                 value={formData.email}
//                 onChange={changeHandler}
//                 type="email"
//                 placeholder='Email Address'
//               />
//               <input
//                 name="password"
//                 value={formData.password}
//                 onChange={changeHandler}
//                 type="password"
//                 placeholder='Password'
//               />
//             </div>
//             <button onClick={() => (state === "Login" ? login() : signup())}>Continue</button>
//             {state === "Sign Up" ? (
//               <p>Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
//             ) : (
//               <>
//                 <p>Create an account? <span onClick={() => setState("Sign Up")}>Click here</span></p>
//                 <p onClick={() => setForgotPassword(true)}>Forgot Password?</p>
//               </>
//             )}
//             <div className="loginsignup-agree">
//               <input type="checkbox" id="" />
//               <p>By continuing, I agree to the terms of use & privacy policy.</p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;
