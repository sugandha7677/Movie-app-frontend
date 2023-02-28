import React, {useEffect, useState} from 'react'
import Container from '../Container';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

import CustomLinks from '../CustomLinks';
import { commonModelClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';
import { useAuth , useNotification } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from '../../utils/helper';


const validateUserInfo = ({ email, password }) => {
    
    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  
    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
      return { ok: false, error: "Password must be 8 characters long!" };
  
    return { ok: true };
  };

const Signin = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
      });

      const navigate = useNavigate();
      const {updateNotification} = useNotification()
      const {handleLogin , authInfo} = useAuth()
      console.log(authInfo)
      const {isPending , isLoggedIn} = authInfo

      //console.log(authInfo);

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
        
        handleLogin(userInfo.email , userInfo.password);

      };

      // useEffect(() => {

      //   // we want to move our user to someone else
      //   if(isLoggedIn) navigate('/')


      // }, [isLoggedIn])



    return (
        <FormContainer>
            <Container>
                <form onSubmit = {handleSubmit} className={commonModelClasses + " w-72 "}>
                    <Title>Sign in</Title>
                    <FormInput value={userInfo.email} onChange = {handleChange} label='Email' placeholder='john@email.com' name='email' />
                    <FormInput value={userInfo.password} onChange = {handleChange} label='Password' placeholder='*********' name='password' type= 'password' />
                    <Submit value='Sign in' busy = {isPending}/>

                    <div className="flex justify-between">
                        <CustomLinks to="/auth/forget-password">Forget password</CustomLinks>
                        <CustomLinks to="/auth/signup">Sign up</CustomLinks>

                    </div>
                </form>
            </Container>
        </FormContainer>
    )
}

export default Signin;