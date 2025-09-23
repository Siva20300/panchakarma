// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const result = await login(formData);
      
//       if (result.success) {
//         // Redirect based on role
//         switch (result.user.role) {
//           case 'doctor':
//             navigate('/doctor-dashboard');
//             break;
//           case 'therapist':
//             navigate('/therapist-dashboard');
//             break;
//           case 'patient':
//             navigate('/patient-dashboard');
//             break;
//           default:
//             navigate('/');
//         }
//       } else {
//         setError(result.error);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('An unexpected error occurred. Please try again.');
//     }
    
//     setIsLoading(false);
//   };

//   return (
//     <div style={{ 
//       minHeight: '100vh', 
//       width: '100%',
//       display: 'flex',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       position: 'relative',
//       overflow: 'hidden'
//     }}>
//       <style>
//         {`
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           @keyframes float {
//             0%, 100% {
//               transform: translateY(0px);
//             }
//             50% {
//               transform: translateY(-20px);
//             }
//           }
//           @keyframes spin {
//             from {
//               transform: rotate(0deg);
//             }
//             to {
//               transform: rotate(360deg);
//             }
//           }
//           .floating-shapes {
//             position: absolute;
//             width: 100%;
//             height: 100%;
//             overflow: hidden;
//             z-index: 1;
//           }
//           .shape {
//             position: absolute;
//             background: rgba(255, 255, 255, 0.1);
//             border-radius: 50%;
//             animation: float 6s ease-in-out infinite;
//           }
//           .shape:nth-child(1) {
//             width: 80px;
//             height: 80px;
//             top: 20%;
//             left: 10%;
//             animation-delay: 0s;
//           }
//           .shape:nth-child(2) {
//             width: 120px;
//             height: 120px;
//             top: 60%;
//             left: 80%;
//             animation-delay: 2s;
//           }
//           .shape:nth-child(3) {
//             width: 60px;
//             height: 60px;
//             top: 80%;
//             left: 20%;
//             animation-delay: 4s;
//           }
//         `}
//       </style>
      
//       {/* Floating Background Shapes */}
//       <div className="floating-shapes">
//         <div className="shape"></div>
//         <div className="shape"></div>
//         <div className="shape"></div>
//       </div>

//       {/* Left Side - Login Form */}
//       <div style={{
//         flex: '1',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '2rem',
//         position: 'relative',
//         zIndex: 2
//       }}>
//         <div style={{
//           width: '100%',
//           maxWidth: '400px',
//           animation: 'fadeInUp 0.8s ease-out'
//         }}>
//           {/* Login Card */}
//           <div style={{
//             backgroundColor: 'white',
//             borderRadius: '20px',
//             padding: '2.5rem',
//             boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
//             backdropFilter: 'blur(20px)',
//             border: '1px solid rgba(255, 255, 255, 0.2)'
//           }}>
//             {/* Header */}
//             <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//               <div style={{
//                 width: '60px',
//                 height: '60px',
//                 background: 'linear-gradient(135deg, #667eea, #764ba2)',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 margin: '0 auto 1rem',
//                 color: 'white',
//                 fontSize: '1.5rem',
//                 fontWeight: 'bold'
//               }}>
//                 ⚡
//               </div>
//               <h1 style={{
//                 fontSize: '1.75rem',
//                 fontWeight: '700',
//                 color: '#1a202c',
//                 margin: '0 0 0.5rem 0'
//               }}>
//                 Login
//               </h1>
//               <p style={{
//                 color: '#718096',
//                 fontSize: '0.9rem',
//                 margin: 0
//               }}>
//                 See your growth and get consulting support!
//               </p>
//             </div>

//             {/* Google Sign In Button */}
//             <button style={{
//               width: '100%',
//               padding: '0.75rem',
//               border: '1px solid #e2e8f0',
//               borderRadius: '12px',
//               backgroundColor: 'white',
//               color: '#4a5568',
//               fontSize: '0.9rem',
//               fontWeight: '500',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '0.5rem',
//               cursor: 'pointer',
//               transition: 'all 0.2s ease',
//               marginBottom: '1.5rem'
//             }}>
//               <span style={{ fontSize: '1.2rem' }}>🔍</span>
//               Sign in with Google
//             </button>

//             {/* Divider */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               marginBottom: '1.5rem'
//             }}>
//               <div style={{
//                 flex: 1,
//                 height: '1px',
//                 backgroundColor: '#e2e8f0'
//               }}></div>
//               <span style={{
//                 padding: '0 1rem',
//                 color: '#a0aec0',
//                 fontSize: '0.8rem'
//               }}>or Sign in with Email</span>
//               <div style={{
//                 flex: 1,
//                 height: '1px',
//                 backgroundColor: '#e2e8f0'
//               }}></div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div style={{
//                 backgroundColor: '#fef7ed',
//                 color: '#ea580c',
//                 padding: '1rem 1.25rem',
//                 borderRadius: '16px',
//                 marginBottom: '1.5rem',
//                 fontSize: '0.9rem',
//                 border: '1px solid #fed7aa',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.75rem',
//                 animation: 'fadeInUp 0.5s ease-out'
//               }}>
//                 <span style={{ fontSize: '1.2rem' }}>⚠️</span>
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//               {/* Email Field */}
//               <div style={{ marginBottom: '1.5rem' }}>
//                 <label style={{
//                   display: 'block',
//                   fontSize: '0.875rem',
//                   fontWeight: '600',
//                   color: '#374151',
//                   marginBottom: '0.5rem'
//                 }}>
//                   Email*
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="mail@website.com"
//                   style={{
//                     width: '100%',
//                     padding: '0.75rem 1rem',
//                     fontSize: '0.9rem',
//                     border: '1px solid #d1d5db',
//                     borderRadius: '8px',
//                     backgroundColor: '#f9fafb',
//                     transition: 'all 0.2s ease',
//                     outline: 'none',
//                     color: '#374151'
//                   }}
//                   onFocus={(e) => {
//                     e.target.style.borderColor = '#667eea';
//                     e.target.style.backgroundColor = '#ffffff';
//                     e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
//                   }}
//                   onBlur={(e) => {
//                     e.target.style.borderColor = '#d1d5db';
//                     e.target.style.backgroundColor = '#f9fafb';
//                     e.target.style.boxShadow = 'none';
//                   }}
//                 />
//               </div>

//               {/* Password Field */}
//               <div style={{ marginBottom: '1.5rem' }}>
//                 <label style={{ 
//                   display: 'block', 
//                   marginBottom: '0.5rem', 
//                   color: '#374151', 
//                   fontWeight: '600',
//                   fontSize: '0.875rem'
//                 }}>
//                   Password*
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     placeholder="Min. 8 character"
//                     style={{
//                       width: '100%',
//                       padding: '0.75rem 3rem 0.75rem 1rem',
//                       border: '1px solid #d1d5db',
//                       borderRadius: '8px',
//                       fontSize: '0.9rem',
//                       backgroundColor: '#f9fafb',
//                       transition: 'all 0.2s ease',
//                       outline: 'none',
//                       color: '#374151'
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = '#667eea';
//                       e.target.style.backgroundColor = '#ffffff';
//                       e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = '#d1d5db';
//                       e.target.style.backgroundColor = '#f9fafb';
//                       e.target.style.boxShadow = 'none';
//                     }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     style={{
//                       position: 'absolute',
//                       right: '1rem',
//                       top: '50%',
//                       transform: 'translateY(-50%)',
//                       background: 'none',
//                       border: 'none',
//                       cursor: 'pointer',
//                       fontSize: '1.2rem',
//                       color: '#6b7280',
//                       padding: '0.25rem',
//                       borderRadius: '4px',
//                       transition: 'color 0.2s ease'
//                     }}
//                     onMouseOver={(e) => e.target.style.color = '#2e7d32'}
//                     onMouseOut={(e) => e.target.style.color = '#6b7280'}
//                     title={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? (
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
//                         <line x1="1" y1="1" x2="23" y2="23"/>
//                       </svg>
//                     ) : (
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                         <circle cx="12" cy="12" r="3"/>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me Checkbox */}
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 marginBottom: '1.5rem'
//               }}>
//                 <label style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.5rem',
//                   fontSize: '0.875rem',
//                   color: '#6b7280',
//                   cursor: 'pointer'
//                 }}>
//                   <input
//                     type="checkbox"
//                     style={{
//                       width: '16px',
//                       height: '16px',
//                       accentColor: '#667eea'
//                     }}
//                   />
//                   Remember me
//                 </label>
//                 <Link
//                   to="/forgot-password"
//                   style={{
//                     fontSize: '0.875rem',
//                     color: '#667eea',
//                     textDecoration: 'none',
//                     fontWeight: '500'
//                   }}
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <button 
//                 type="submit" 
//                 disabled={isLoading}
//                 style={{
//                   width: '100%',
//                   padding: '0.75rem',
//                   fontSize: '0.9rem',
//                   fontWeight: '600',
//                   background: isLoading 
//                     ? 'linear-gradient(135deg, #9ca3af, #d1d5db)' 
//                     : 'linear-gradient(135deg, #667eea, #764ba2)',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '8px',
//                   cursor: isLoading ? 'not-allowed' : 'pointer',
//                   transition: 'all 0.2s ease',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   opacity: isLoading ? 0.7 : 1
//                 }}
//                 onMouseOver={(e) => {
//                   if (!isLoading) {
//                     e.target.style.transform = 'translateY(-1px)';
//                     e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
//                   }
//                 }}
//                 onMouseOut={(e) => {
//                   if (!isLoading) {
//                     e.target.style.transform = 'translateY(0)';
//                     e.target.style.boxShadow = 'none';
//                   }
//                 }}
//               >
//                 {isLoading ? (
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
//                     <div style={{
//                       width: '20px',
//                       height: '20px',
//                       border: '2px solid rgba(255,255,255,0.3)',
//                       borderTop: '2px solid white',
//                       borderRadius: '50%',
//                       animation: 'spin 1s linear infinite'
//                     }}></div>
//                     Signing in...
//                   </div>
//                 ) : (
//                   'Login'
//                 )}
//               </button>
//             </form>

//             {/* Register Link */}
//             <div style={{ 
//               marginTop: '1.5rem', 
//               textAlign: 'center'
//             }}>
//               <p style={{ 
//                 color: '#6b7280', 
//                 fontSize: '0.875rem', 
//                 marginBottom: '0.5rem'
//               }}>
//                 Not registered yet? 
//                 <Link 
//                   to="/register" 
//                   style={{ 
//                     color: '#667eea', 
//                     fontWeight: '600',
//                     textDecoration: 'none',
//                     marginLeft: '0.25rem'
//                   }}
//                 >
//                   Create an Account
//                 </Link>
//               </p>
//             </div>

//             {/* Back to Home Link */}
//             <div style={{ 
//               marginTop: '1rem', 
//               textAlign: 'center'
//             }}>
//               <Link 
//                 to="/" 
//                 style={{ 
//                   color: '#9ca3af', 
//                   fontSize: '0.8rem',
//                   textDecoration: 'none'
//                 }}
//               >
//                 Back to Home
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Illustration/Info */}
//       <div style={{
//         flex: '1',
//         background: 'rgba(255, 255, 255, 0.1)',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '2rem',
//         position: 'relative',
//         zIndex: 2
//       }}>
//         <div style={{
//           textAlign: 'center',
//           color: 'white',
//           maxWidth: '400px'
//         }}>
//           <div style={{
//             width: '120px',
//             height: '120px',
//             background: 'rgba(255, 255, 255, 0.2)',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '0 auto 2rem',
//             fontSize: '3rem',
//             backdropFilter: 'blur(20px)',
//             border: '2px solid rgba(255, 255, 255, 0.3)'
//           }}>
//             🧘‍♀️
//           </div>
//           <h2 style={{
//             fontSize: '2rem',
//             fontWeight: '700',
//             marginBottom: '1rem',
//             textShadow: '0 2px 4px rgba(0,0,0,0.1)'
//           }}>
//             Turn your ideas into reality.
//           </h2>
//           <p style={{
//             fontSize: '1.1rem',
//             opacity: 0.9,
//             lineHeight: '1.6'
//           }}>
//             Consistent quality and experience across all platforms and devices.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(formData);
      
      if (result.success) {
        // Redirect based on role
        switch (result.user.role) {
          case 'doctor':
            navigate('/doctor-dashboard');
            break;
          case 'therapist':
            navigate('/therapist-dashboard');
            break;
          case 'patient':
            navigate('/patient-dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
    
    setIsLoading(false);
  };

  // SVG Icons as components for reusability
  const LotusIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16.2c-2.4-1.3-4.8-3.1-6-5.2-1.2-2.1-1.7-4.6-1-7 .7-2.3 2.5-4 4.8-4.7 2.4-.7 4.8.3 6.2 2.1 1.4 1.8 1.4 4.3.2 6.1L12 22 2 12.1C.6 10.3.6 7.8 2 6c1.4-1.8 3.8-2.8 6.2-2.1 2.3.7 4.1 2.4 4.8 4.7.7 2.4.2 5-1 7-1.2 2.1-3.6 3.9-6 5.2" />
      <path d="M12 22V12" />
    </svg>
  );

  const GoogleIcon = () => (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48 24C48 22.0428 47.822 20.1257 47.4855 18.2727H24.48V28.9091H37.818C37.2215 32.0911 35.2515 34.6911 32.4435 36.3636V42.8182H40.7385C45.3815 38.5455 48 31.8636 48 24Z" fill="#4285F4"></path><path fillRule="evenodd" clipRule="evenodd" d="M24.4799 48.0001C30.9599 48.0001 36.4039 45.8183 40.7389 42.8183L32.4439 36.3637C30.2059 37.8274 27.5359 38.7274 24.4799 38.7274C18.6679 38.7274 13.7119 34.9637 12.0879 29.6365H3.51191V36.2274C7.79591 43.1819 15.5359 48.0001 24.4799 48.0001Z" fill="#34A853"></path><path fillRule="evenodd" clipRule="evenodd" d="M12.0879 29.6364C11.5639 28.0909 11.2319 26.4545 11.2319 24.7727C11.2319 23.0909 11.5639 21.4545 12.0879 19.9091V13.3182H3.51191C1.27191 17.6364 0 21.5455 0 24.7727C0 27.0909 1.27191 31.9091 3.51191 36.2273L12.0879 29.6364Z" fill="#FBBC05"></path><path fillRule="evenodd" clipRule="evenodd" d="M24.4799 9.81818C27.9559 9.81818 31.2439 11.0455 33.6439 13.3182L41.0039 5.95455C36.4039 1.86364 30.9599 0 24.4799 0C15.5359 0 7.79591 4.81818 3.51191 13.3182L12.0879 19.9091C13.7119 14.5818 18.6679 9.81818 24.4799 9.81818Z" fill="#EA4335"></path></svg>
  );

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
  );

  // Decorative SVG elements for the right panel
  const LeafIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0C50 0 81.6667 16.6667 100 50C100 50 50 100 50 100C50 100 0 50 0 50C0 50 18.3333 16.6667 50 0Z" fill="white" fillOpacity="0.1"/>
      <path d="M50 0V100" stroke="white" strokeOpacity="0.2" strokeWidth="2"/>
    </svg>
  );

  const CircleIcon = ({ className }) => (
    <div className={`${className} rounded-full bg-white bg-opacity-10`}></div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      backgroundColor: '#ffffff', 
      fontFamily: "'Inter', system-ui, sans-serif", 
      display: 'flex' 
    }}>
      <style>
        {`
          /* ===== LOGIN PAGE RESPONSIVE STYLES ===== */
          
          /* DESKTOP (Default) */
          .login-container {
            display: flex;
            min-height: 100vh;
          }
          
          .login-form-section {
            width: 50%;
            padding: 3rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .login-right-panel {
            width: 50%;
            background: linear-gradient(135deg, #5E8B7E 0%, #4A7C59 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 3rem;
            position: relative;
            overflow: hidden;
          }
          
          /* TABLET (768px - 1024px) */
          @media screen and (min-width: 768px) and (max-width: 1024px) {
            .login-form-section {
              padding: 2rem;
            }
            
            .login-right-panel {
              padding: 2rem;
            }
            
            .login-form-container {
              max-width: 400px;
            }
          }
          
          /* MOBILE (0px - 767px) */
          @media screen and (max-width: 767px) {
            .login-container {
              flex-direction: column;
            }
            
            .login-form-section {
              width: 100% !important;
              padding: 2rem 1.5rem !important;
              min-height: 100vh;
            }
            
            .login-right-panel {
              display: none !important;
            }
            
            .login-form-container {
              max-width: 100% !important;
              width: 100% !important;
            }
            
            .login-logo {
              text-align: center !important;
              margin-bottom: 2rem !important;
            }
            
            .login-title {
              font-size: 1.75rem !important;
              text-align: center !important;
            }
            
            .login-subtitle {
              font-size: 0.9rem !important;
              text-align: center !important;
              margin-bottom: 2rem !important;
            }
            
            .login-input {
              padding: 1rem !important;
              font-size: 1rem !important;
              margin-bottom: 1rem !important;
            }
            
            .login-button {
              padding: 1rem !important;
              font-size: 1rem !important;
              margin-bottom: 1rem !important;
            }
            
            .google-signin-btn {
              padding: 1rem !important;
              font-size: 1rem !important;
              margin-bottom: 1.5rem !important;
            }
            
            .login-links {
              text-align: center !important;
              font-size: 0.9rem !important;
            }
          }
          
          /* SMALL MOBILE (320px - 480px) */
          @media screen and (max-width: 480px) {
            .login-form-section {
              padding: 1.5rem 1rem !important;
            }
            
            .login-title {
              font-size: 1.5rem !important;
            }
            
            .login-input,
            .login-button,
            .google-signin-btn {
              padding: 0.875rem !important;
            }
          }
        `}
      </style>
      
      {/* Left Side - Login Form */}
      <div className="login-form-section" style={{ 
        width: '50%', 
        backgroundColor: '#ffffff', 
        padding: '3rem', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center' 
      }}>
        <div className="login-form-container" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          {/* Logo and Brand */}
          <div className="login-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#5E8B7E', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white' 
            }}>
              <LotusIcon />
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#2F4858', margin: 0 }}>
              Panchakarma Wellness
            </h1>
          </div>
          
          {/* Welcome Section */}
          <h2 className="login-title" style={{ fontSize: '32px', fontWeight: '700', color: '#2F4858', marginBottom: '8px' }}>
            Welcome Back
          </h2>
          <p className="login-subtitle" style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '16px' }}>
            Begin your journey to wellness and balance.
          </p>

          {/* Google Sign In Button */}
          <button className="google-signin-btn" style={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px', 
            padding: '12px 16px', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px', 
            backgroundColor: '#ffffff', 
            color: '#374151', 
            fontSize: '16px', 
            fontWeight: '500', 
            cursor: 'pointer', 
            marginBottom: '1.5rem',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            <GoogleIcon />
            Sign in with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
            <hr style={{ flex: 1, border: 'none', height: '1px', backgroundColor: '#e5e7eb' }} />
            <span style={{ padding: '0 1rem', fontSize: '14px', color: '#9ca3af' }}>
              or Sign in with Email
            </span>
            <hr style={{ flex: 1, border: 'none', height: '1px', backgroundColor: '#e5e7eb' }} />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ 
              backgroundColor: '#fef2f2', 
              color: '#dc2626', 
              padding: '16px', 
              borderRadius: '8px', 
              marginBottom: '1.5rem', 
              fontSize: '14px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px' 
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" x2="12" y1="8" y2="12"/>
                <line x1="12" x2="12.01" y1="16" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }} htmlFor="email">
                Email*
              </label>
              <input
                className="login-input"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="mail@website.com"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '8px', 
                  fontSize: '16px', 
                  backgroundColor: '#f9fafb', 
                  color: '#374151',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#5E8B7E';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(94, 139, 126, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }} htmlFor="password">
                Password*
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 8 characters"
                  style={{ 
                    width: '100%', 
                    padding: '12px 50px 12px 16px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    fontSize: '16px', 
                    backgroundColor: '#f9fafb', 
                    color: '#374151',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#5E8B7E';
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(94, 139, 126, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.backgroundColor = '#f9fafb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', 
                    right: '16px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    color: '#6b7280',
                    padding: '4px'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontSize: '14px', 
                color: '#6b7280', 
                cursor: 'pointer' 
              }}>
                <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                Remember me
              </label>
              <Link to="/forgot-password" style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#5E8B7E', 
                textDecoration: 'none' 
              }}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              className="login-button"
              type="submit" 
              disabled={isLoading}
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                backgroundColor: isLoading ? '#9ca3af' : '#5E8B7E', 
                color: 'white', 
                fontSize: '16px', 
                fontWeight: '500', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: isLoading ? 'not-allowed' : 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (!isLoading) e.target.style.backgroundColor = '#4a7366';
              }}
              onMouseOut={(e) => {
                if (!isLoading) e.target.style.backgroundColor = '#5E8B7E';
              }}
            >
              {isLoading ? (
                <>
                  <svg style={{ 
                    animation: 'spin 1s linear infinite', 
                    marginRight: '12px', 
                    width: '20px', 
                    height: '20px' 
                  }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="login-links">
            <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginTop: '2rem' }}>
              Not registered yet?{' '}
              <Link to="/register" style={{ fontWeight: '500', color: '#5E8B7E', textDecoration: 'none' }}>
                Create your account here
              </Link>
            </p>

            {/* Back to Home Link */}
            <p style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', marginTop: '1rem' }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#9ca3af' }}>
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Wellness Section */}
      <div className="login-right-panel" style={{ 
        width: '50%', 
        backgroundColor: '#5E8B7E', 
        padding: '3rem', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Background Decorative Elements */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
          <div style={{ 
            position: 'absolute', 
            top: '80px', 
            left: '80px', 
            width: '128px', 
            height: '128px', 
            border: '2px solid white', 
            borderRadius: '50%' 
          }}></div>
          <div style={{ 
            position: 'absolute', 
            bottom: '128px', 
            right: '64px', 
            width: '96px', 
            height: '96px', 
            border: '1px solid white', 
            borderRadius: '50%' 
          }}></div>
          <div style={{ 
            position: 'absolute', 
            top: '33%', 
            right: '25%', 
            width: '64px', 
            height: '64px', 
            border: '1px solid white', 
            borderRadius: '50%' 
          }}></div>
        </div>

        <div style={{ textAlign: 'center', color: 'white', zIndex: 10, maxWidth: '500px' }}>
          {/* Main Heading */}
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            marginBottom: '2rem', 
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            lineHeight: '1.2'
          }}>
            The Path to Inner Harmony
          </h1>
          
          <p style={{ 
            fontSize: '20px', 
            opacity: 0.95, 
            lineHeight: 1.6, 
            marginBottom: '3rem',
            fontWeight: '400'
          }}>
            Our platform guides you through the ancient practices of Panchakarma to restore your body's natural balance.
          </p>

          {/* Feature Cards */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem', 
            marginTop: '2rem' 
          }}>
            {/* Comprehensive System Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  🏥
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Comprehensive System</h3>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, lineHeight: 1.4 }}>
                Complete management for doctors, therapists, and patients in one integrated system.
              </p>
            </div>

            {/* Restore Balance Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  ⚖️
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Restore Balance</h3>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, lineHeight: 1.4 }}>
                Harmonize your doshas for improved well-being.
              </p>
            </div>

            {/* Rejuvenate Mindfully Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  🧘‍♀️
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Rejuvenate Mindfully</h3>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, lineHeight: 1.4 }}>
                Revitalize your mind and body, fostering vitality.
              </p>
            </div>

            {/* Detoxify & Cleanse Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  💧
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Detoxify & Cleanse</h3>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, lineHeight: 1.4 }}>
                Eliminate toxins and purify your system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;






