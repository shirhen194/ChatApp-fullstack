import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { login, getUserById } from '../services/users.js'

function SignIn(props) {

  const id = useRef(null)
  const password = useRef(null)

  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  }

  const renderSubmit = () => {
    // await login(form).then(res => {
    //   if (res.data.errors) {
    //     setErrors(res.data.errors)
    //   } else {
    //     setOnline(res.data.user.id)
    //     props.setUser(res.data.user)
    //     props.history.push('/chat')
    //   }
    // findMatch().then(res => {
    //   console.log("findMatch")
    //   console.log(res)
    // }).catch(err => {
    //   console.log("err")
    //   console.log(err)
    // })
    // if (Object.keys(findMatch()).length > 0) {
      // return (
      //   <input type="button"
      //     value="WELCOME"
      //     // onKeyDown={() => handleSubmit(findMatch())}
      //     onKeyDown={() => handleSubmit()}
      //     onClick={() => handleSubmit()}
      //   />
      // )
    // } else {
      return (
        // <Link to='/chat'>
          <input type="button"
            value="WELCOME"
            onKeyDown={() => handleSubmit()}
            onClick={() => handleSubmit()}
          />
        // </Link>
      )
    // }
    // return ''
  }

  const findMatch = async () => {
    const { name, password } = form
    const newErrors = {}
    if (!name) {
      return newErrors
    }


    //service
    await getUserById(name).then(res => {
      if (res) {
        // setToken(res.token)
        if (res.password !== password) {
          newErrors.password = 'Incorrect Password'
        }
      } else {
        newErrors.name = 'no account with these credentials!'
      }
    }).catch(err => {
      newErrors.name = 'no account with these credentials!'
    })
    // return newErrors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return newErrors
    } 
  }

  const handleSubmit = e => {
     // service
    findMatch().then(newErrors => {
    if (!newErrors || Object.keys(newErrors).length == 0) {
      login(form.name, form.password).then(res => {
        props.setToken(res.token)
        props.setStateOnline(res)
        // else {
        //   props.setOnline(res.data.user.id)
        // }
      }).catch((err, res) => {
        console.log("err in login")
      })
    }})
    // return false;
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
        <input type="text" placeholder="id" name="id"
          ref={id}
          onChange={e => setField('name', e.target.value)}
        /><br />
        <div className="error" style={{ color: 'red' }}>{errors.name}</div>
        <input type="password" placeholder="Password" name="password"
          ref={password}
          onChange={e => setField('password', e.target.value)}
          onKeyDown={e => e.key === 'Enter' ? handleSubmit(findMatch()) : null}
        /><br />
        <div className="error" style={{ color: 'red' }}>{errors.password}</div>
        <div className="remember-checkbox">
          <input type="checkbox" name="remember" />
          <span>&nbsp;Remember me</span><br />
        </div>
        {renderSubmit()}
        <div style={{ color: 'white' }}>Not a member?&nbsp;
          <Link to="/register">
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
