import { useState } from 'react';
import { signin } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import styles from './SignInForm.module.css';



const SignInForm = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState(['']);
    const updateMessage = (msg) => {
        setMessage(msg);
    };


    const { username, password } = formData;

    const handleChange = (e) => {
        updateMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signin(formData);
            props.setUser(user);
            navigate('/')
        } catch (err) {
            updateMessage(err.message);
        }

    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <form className={`border container-m p-5 h-75 text-light w-50 ${styles.form}`} onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className={styles.signup}>
                            <p>Doesn't have an account yet?</p>
                            <a className='text-light' href='' onClick={() => navigate('/users/signup')}>Sign Up</a>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" value={username} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="password" value={password} onChange={handleChange} autoComplete='off' />
                            <div className="form-text">We'll never share your password with anyone else.</div>
                        </div>
                        <button type="submit" className={`btn w-100 mb-2 form-control ${styles.button}`}>Login</button>
                    </form>
                    <p>{message}</p>
                </div>
            </div>
        </>
    );
}

export default SignInForm;