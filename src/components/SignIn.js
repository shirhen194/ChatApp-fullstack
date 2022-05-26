import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

function SignIn(props) {

  const userName = useRef(null)
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
    if (Object.keys(findMatch()).length > 0) {
      return (
        <input type="button"
          value="WELCOME"
          onKeyDown={() => handleSubmit(findMatch())}
          onClick={() => handleSubmit(findMatch())}
        />
      )
    } else {
      return (
        <Link to='/chat'>
          <input type="button"
            value="WELCOME"
            onKeyDown={() => handleSubmit(findMatch())}
            onClick={() => handleSubmit(findMatch())}
          />
        </Link>
      )
    }
  }

  const findMatch = () => {
    const { name, password } = form
    const newErrors = {}
    for (var i = 0; i < (props.users).length; i++) {
      if (props.users[i].userName === name && props.users[i].password === password) return newErrors
    }

    newErrors.password = 'no account with these credentials!'

    return newErrors
  }

  const handleSubmit = e => {
    const newErrors = findMatch()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
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
          onKeyDown={ e => e.key === 'Enter' ? handleSubmit(findMatch()) : null }
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
