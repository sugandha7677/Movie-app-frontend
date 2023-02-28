import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";


import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import { commonModelClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLinks from "../CustomLinks";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";



const validateUserInfo = ({ name, email, password }) => {

  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {authInfo} = useAuth()
  const {isLoggedIn} = authInfo;

  const {updateNotification} = useNotification()

  const handleChange = ({ target }) => {
    
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
    //console.log(target.value , target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { ok, error } = validateUserInfo(userInfo);

    if(!ok) return updateNotification('error' , error);
    console.log(userInfo);

    const response = await createUser(userInfo);
    if(response.error) return console.log(response.error);

    navigate('/auth/verification' , {state: {user: response.user} , replace: true,})
    console.log(response.user);
  };

  useEffect(() => {

    // we want to move our user to someone else
    if(isLoggedIn) navigate('/')


  }, [isLoggedIn])


  const { name, email, password } = userInfo;

  return (
    <FormContainer>
      <Container>
        
        <form onSubmit={handleSubmit} className={commonModelClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            label="Name"
            placeholder="John Doe"
            name="name"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign up" />

          <div className="flex justify-between">
            <CustomLinks to="/auth/forget-password">Forget password</CustomLinks>
            <CustomLinks to="/auth/signin">Sign in</CustomLinks>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
