import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import {useRef, useState} from 'react'



function Register(props) {
  const userName = useRef(null)
  const password = useRef(null)
  const password_confirmation = useRef(null)
  let displayName = useRef(null)
  let pro_pic = useRef(null)

  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const renderSubmit = () => {
    const errors = findFormErrors()
    const error_keys = Object.keys(errors)
     if (error_keys.length > 0) {
      return (
        <input type="button"
          value="WELCOME"
          onKeyDown={() => handleSubmit(errors)}
          onClick={() => handleSubmit(errors)}
        />
      )
    } else {
      return (
        <Link to='/chat'>
          <input type="button"
            value="WELCOME"
            onKeyDown={() => handleSubmit(errors)}
            onClick={() => handleSubmit(errors)}
          />
        </Link>
      )
    }
  }

  const findFormErrors = () => {
    const { name, password, password_confirmation, display_Name, pic } = form
    const newErrors = {}

    // userName errors
    if ( !name || name === '' ) newErrors.name = 'enter username!'
    else if ( !newErrors.name ) {
      for (var i = 0; i < (props.users).length; i++) {
        if (props.users[i].userName === name ) newErrors.name = 'username is not available'
      }
    }

    // password errors
    if ( !password && password === '') newErrors.password = 'enter password!'
    else if ( !(/[^0-9]+/.test(password) && /[^A-Za-z]+/.test(password))) newErrors.password = 'password must include numbers and letters!'
    
    // password confirmation errors
    if ( (password !== password_confirmation) && password ) newErrors.password_confirmation = 'passwords do not match'
    
    // displayName errors
    if ( !display_Name || display_Name === '' ) displayName = name
    else if (display_Name.length > 30) newErrors.display_Name = 'no more than 30 characters'
    else displayName = display_Name
    
    // profile picture errors
    if ( !pic || pic === '') pro_pic = "cat_aviad.jpg"
    else if ( !pic.name.match(/\.(jpg|jpeg|png|gif)$/)) newErrors.pic = 'enter profile pic'
    else pro_pic = URL.createObjectURL(pic)
    
    return newErrors
  }

  const handleSubmit = errors => {
    if ( Object.keys(errors).length > 0 ) {
      setErrors(errors)
    } else {
      console.log(displayName)
        props.users.push({                                    
            userName:userName.current.value,
            password: password.current.value,
            displayName: displayName,
            pic: pro_pic,
            contacts:[]
          });
          props.setOnline(userName.current.value) 
    }
    return false;
  }
  return (
    <div>
      <div className="body"></div>
      <div className="grad"></div>
      <div className="header">
        <div>Chat<span>App</span></div>
      </div>
      <br />
      <div className="login">
        <input type="text" placeholder="Username" name="userName"
          ref={userName}
          onChange={e => setField('name', e.target.value)}
        /><br />
        <div className="error" style={{ color: 'red' }}>{errors.name}</div>

        <input type="password" placeholder="Password" name="password"
          ref={password}
          onChange={e => setField('password', e.target.value)}
        /><br />
        <div className="error" style={{ color: 'red' }}>{errors.password}</div>

        <input type="password" placeholder="confirm password" name="password_confirmation"
          ref={password_confirmation}
          onChange={e => setField('password_confirmation', e.target.value)}
        /><br />
        <div className="error" style={{ color: 'red' }}>{errors.password_confirmation}</div>

        <input type="displayName" placeholder="display name" name="displayName"
          ref={displayName}
          onChange={e => setField('display_Name', e.target.value)}
        /><br />
        <div className="error" style={{ color: 'red' }}>{errors.display_Name}</div> 

        <input type="file" placeholder="Enter profile picture" name="pic"
          ref={pro_pic}
          onChange={e => setField('pic', e.target.files[0])}
        /><br />
        <div className="error" style={{ color: 'red' }}>{errors.pic}</div>
   
        {renderSubmit()}
        <div style={{ color: 'white' }}>Already a member?&nbsp;
          <Link to="/">
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
