import React, { useState } from 'react'
import Container from '../Container';
import FormInput from '../form/FormInput';
import CustomLinks from '../CustomLinks';
import Title from '../form/Title';
import Submit from '../form/Submit';
import FormContainer from '../form/FormContainer';
import { commonModelClasses } from '../../utils/theme';
import { forgetPassword } from '../../api/auth';
import { isValidEmail } from '../../utils/helper';
import { useNotification } from '../../hooks';


const ForgetPassword = () => {

  const [email , setEmail] = useState('')

  const {updateNotification} = useNotification()

  const handleChange = ({ target }) => {
    
    const { value } = target;
    setEmail({ value });
    //console.log(target.value , target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!isValidEmail(email)) return updateNotification('error', 'Invalid email!')
    const {error , message}  = await forgetPassword(email)
    if(error) return updateNotification('error', error)

    updateNotification('success', message)
  };


  return (
    <FormContainer>
      <Container>
        <form onSubmit = {handleSubmit} className={ commonModelClasses+' w-96'}>
          <Title>Please Enter Your Email</Title>
          <FormInput onChange = {handleChange} value= {email} label='Email' placeholder='john@email.com' name='email' />
          
          <Submit value='Send Link' />

          <div className="flex justify-between">
            <CustomLinks to="/auth/signin">Sign in</CustomLinks>
            <CustomLinks to="/auth/signup">Sign up</CustomLinks>

          </div>
        </form>
      </Container>
    </FormContainer>
  )
}

export default ForgetPassword