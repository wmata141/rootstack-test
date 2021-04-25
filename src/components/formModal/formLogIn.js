import React, { useState } from 'react';
import { Button, Link, Box, Tooltip, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineMail, AiFillLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { CgFacebook } from 'react-icons/cg';
import { useStyles } from './styles';
import { validateEmailPassword, withoutValues, withValues, validateRegistroCampo } from '../../assets/utilities';
import { LOGIN_USER } from '../../reducers/authReducer';
import { PICK_UP } from '../../reducers/alertReducer';
import { emailPassword } from '../../assets/utilities/models';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';

const FormLogIn = ({ setType, setOpenModal }) => {
  const [values, setValues] = useState(emailPassword);
  const [errors, setErrors] = useState(emailPassword);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch()
  let history = useHistory()

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setErrors(validateEmailPassword(values));

    if (withoutValues(errors) && withValues(values)) {
      try {
        const loginUser = values;
        const loginRes = await axios.post(
          "https://coding-test.rootstack.net/api/auth/login",
          loginUser
        );       
        
        const obj = {
          'token': loginRes.data.access_token,
          'user': loginUser.email 
        }

        localStorage.setItem("auth", JSON.stringify(obj));
        
        dispatch({ type: LOGIN_USER, payload: {
            token: loginRes.data.access_token,
            user: loginUser.email,
          } 
        })
        
        setOpenModal(false)
        history.push("/home");
      } catch (err) {
        console.log("err ==>",err);
        console.log("err response ==>",err.response);
        if (err.response) {
          dispatch({ type: PICK_UP, payload: { open: true, severity: 'warning', message: err.response.statusText } })
        }        
      }
    } else {
      dispatch({ type: PICK_UP, payload: { open: true, severity: 'warning', message: `Datos invalidos` } })
    }
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    setErrors(validateRegistroCampo(event.target.name, event.target.value, errors))
  };

  const outService = () => {
    dispatch({ type: PICK_UP, payload: { open: true, severity: 'warning', message: `Fuera de Servicio` } })
  }

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Button
        fullWidth
        variant='contained'
        className={classes.facebookBtn}
        startIcon={<CgFacebook />}
        onClick={() => outService()}
      >
        Iniciar con Facebook
      </Button>
      <Button
        type='submit'
        fullWidth
        variant="outlined"
        className={classes.googleBtn}
        startIcon={<FcGoogle />}
        onClick={() => outService()}
      >
        Iniciar con Google
      </Button>

      <FormControl className={classes.margin} variant="outlined" size="small" fullWidth>
        <InputLabel>Correo Electronico</InputLabel>
        <Tooltip open={errors.email.length > 0 && isSubmitting} placement="top" title={errors.email}>
          <OutlinedInput
            name="email"
            onChange={handleChange}
            value={values.email}
            startAdornment={
              <InputAdornment position="start" style={errors.email.length > 0 && isSubmitting ? { color: '#f44336' } : {}}>
                <AiOutlineMail size={20} />
              </InputAdornment>
            }
            labelWidth={135}
          />
        </Tooltip>
      </FormControl>

      <FormControl className={classes.margin} variant="outlined" size="small" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <Tooltip open={errors.password.length > 0 && isSubmitting} placement="top" title={errors.password}>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleChange}
            value={values.password}
            startAdornment={
              <InputAdornment position="start" style={errors.password.length > 0 && isSubmitting ? { color: '#f44336' } : {}}>
                <AiFillLock size={20} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </Tooltip>
      </FormControl>

      <Button
        onClick={() => handleSubmit()}
        fullWidth
        variant='contained'
        className={classes.submitBtn}
      >
        Iniciar Sesion
      </Button>

      <div style={{ textAlign: 'center' }}>
        <Box component="span" m={1} >
          {"¿Olvidaste la contraseña? "}
          <Link onClick={() => outService()} style={{ color: '#eb6d07', cursor: 'pointer' }}>
            Recuperala
          </Link>
        </Box>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Box component="span" m={1} >
          {"¿Aun no tienes cuenta? "}
          <Link onClick={() => outService()} style={{ color: '#eb6d07', cursor: 'pointer' }}>
            Registrate
          </Link>
        </Box>
      </div>
    </div>
  );
};

export default FormLogIn;