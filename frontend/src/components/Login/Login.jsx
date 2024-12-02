import React, { useContext, useState } from 'react';
import axios from 'axios'
import { Formik, Form, Field  } from 'formik';
import * as Yup from 'yup';
import LoginFooter from './LoginFooter.jsx'
import LoginNavbar from './LoginNavbar.jsx';
import { LoginButton } from './LoginButtons.jsx';
import { LoginPicture } from './LoginAttachments.jsx';
import { FieldError } from './styles.jsx';
import { useNavigate } from 'react-router-dom';

const validationLoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
});

// const handleSubmit = async (formikValues) => {
//   console.log(formikValues)
//     const response = await axios
//       // .post("http://localhost:5002/api/v1/login", data)
//       axios.post('/api/v1/login', { username: 'admin', password: 'admin' }).then((response) => {
//       console.log(response.data); // => { token: ..., username: 'admin' }
// })
//       .catch((err) => {
//         console.log(err)
// // //         // if (err && err.response) setError(err.response.data.message);
//       });
//   };

const LoginForm = () => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (formikValues) => {
    console.log(formikValues)
      const response = await
        // axios.post("http://localhost:5002/api/v1/login", { username: 'admin', password: 'admin' })
        axios.post('/api/v1/login', { username: 'admin', password: 'admin' })
        .then((response) => {
        setHasError(false);
        navigate('/');
        console.log(response.data); // => { token: ..., username: 'admin' }
  })
        .catch((err) => {
          setHasError(true);
          navigate('/login');
          console.log(err);
        });
    };
  return (
    <div>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationLoginSchema}
      onSubmit = { (formikValues) => handleSubmit(formikValues)}
    >
      {({ errors }) => (
      <div className='card-body row p-5'>
        <LoginNavbar />
        <LoginPicture />
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1>Войти</h1>
          <div className="form-floating mb-4">
          <label htmlFor="username">Ваш ник</label>
          <Field
            className="form-control" 
            type="text" 
            name="username" 
            autoComplete="username" 
            id="username" 
            placeholder="Ваш ник"
            />
            {/* тут позже добавить зеленую рамку, если валидный ник, и красную, если нет (класс invalid feedback/is-valid) */}
            {errors.username ?
            // (<div className="invalid-feedback">{errors.username}</div>) 
            ( <FieldError className="invalid feedback">{errors.username}</FieldError>)
            : ""
            }
          </div>

          <div className="form-floating mb-4">
          <label htmlFor="password">Пароль</label>
          <Field 
            className="form-control" 
            type="current-password" 
            name="password" 
            autoComplete="current-password" 
            id="password" 
            placeholder="password"
          />
          {errors.password ? ( <FieldError className="invalid feedback">{errors.password}</FieldError>) : ""}
          </div>
          <LoginButton></LoginButton>
        </Form>
        <LoginFooter /> 
      </div>
      )}
      </Formik>
      </div>
  )
}


export default LoginForm;
