'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'Weak';
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8)
      return 'Strong';
    return 'Medium';
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.username.trim()) newErrors.username = 'Please enter a username.';
    else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters.';

    if (!formData.email.trim()) newErrors.email = 'Please enter your email address.';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address.';

    if (!formData.password.trim()) newErrors.password = 'Please enter a password.';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccess(true);
      setFormData({ username: '', email: '', password: '' });
      setPasswordStrength('');
      setErrors({});

      // Redirect after a short delay to show success message
      setTimeout(() => {
        setSuccess(false);
        router.push('/booking/form');  // Change '/booking' to your actual booking page route
      }, 500);
    } else {
      setSuccess(false);
    }
  };

  const strengthColor = {
    Weak: '#e74c3c',
    Medium: '#f39c12',
    Strong: '#27ae60',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage:
          'url("https://raw.githubusercontent.com/harshyadav2810/Sikkim-Monastery-project/main/mon2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          backgroundColor: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(10px)',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '420px',
          color: '#222',
          position: 'relative',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            fontWeight: '700',
            color: '#2c3e50',
          }}
        >
          Sign Up
        </h2>

        <label
          htmlFor="username"
          style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#34495e' }}
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: errors.username ? '5px' : '20px',
            borderRadius: '8px',
            border: errors.username ? '2px solid #e74c3c' : '1.5px solid #ccc',
            fontSize: '16px',
            outlineColor: '#ff7f3f',
            transition: 'border-color 0.3s ease',
          }}
        />
        {errors.username && (
          <div
            style={{
              marginBottom: '15px',
              color: '#e74c3c',
              fontWeight: '600',
              fontSize: '14px',
              opacity: errors.username ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            ⚠️ {errors.username}
          </div>
        )}

        <label
          htmlFor="email"
          style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#34495e' }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: errors.email ? '5px' : '20px',
            borderRadius: '8px',
            border: errors.email ? '2px solid #e74c3c' : '1.5px solid #ccc',
            fontSize: '16px',
            outlineColor: '#ff7f3f',
            transition: 'border-color 0.3s ease',
          }}
        />
        {errors.email && (
          <div
            style={{
              marginBottom: '15px',
              color: '#e74c3c',
              fontWeight: '600',
              fontSize: '14px',
              opacity: errors.email ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            ⚠️ {errors.email}
          </div>
        )}

        <label
          htmlFor="password"
          style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#34495e' }}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: errors.password ? '5px' : '8px',
            borderRadius: '8px',
            border: errors.password ? '2px solid #e74c3c' : '1.5px solid #ccc',
            fontSize: '16px',
            outlineColor: '#ff7f3f',
            transition: 'border-color 0.3s ease',
          }}
        />
        {errors.password && (
          <div
            style={{
              marginBottom: '15px',
              color: '#e74c3c',
              fontWeight: '600',
              fontSize: '14px',
              opacity: errors.password ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            ⚠️ {errors.password}
          </div>
        )}

        {passwordStrength && !errors.password && (
          <div
            style={{
              marginBottom: '20px',
              fontWeight: '600',
              fontSize: '14px',
              color: strengthColor[passwordStrength as keyof typeof strengthColor],
              transition: 'color 0.3s ease',
            }}
          >
            Password strength: {passwordStrength}
          </div>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: '#ff7f3f',
            color: 'white',
            width: '100%',
            padding: '15px',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 127, 63, 0.5)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e67333')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff7f3f')}
        >
          Sign Up
        </button>

        {success && (
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#27ae60',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(39, 174, 96, 0.5)',
              fontWeight: '700',
              fontSize: '16px',
              opacity: success ? 1 : 0,
              transition: 'opacity 0.5s ease',
              pointerEvents: 'none',
            }}
          >
            🎉 Signup successful!
          </div>
        )}
      </form>
    </div>
  );
}


