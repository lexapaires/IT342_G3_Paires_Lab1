import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            if (response.status === 200) {
                const authHeader = 'Basic ' + btoa(`${formData.email}:${formData.password}`);
                localStorage.setItem('auth', authHeader);
                localStorage.setItem('userEmail', formData.email);
                navigate('/dashboard');
            }
        } catch (error: any) {
            setMessage('Login failed: ' + (error.response?.data || 'Invalid credentials'));
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
            <Link to="/register">Register here</Link>
        </div>
    );
}
export default Login;