// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"

// const Navbar = () => {
//   const { user, logout, isAuthenticated } = useAuth()
//   const navigate = useNavigate()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)
//   const [dropdownTimeout, setDropdownTimeout] = useState(null)

//   const handleLogout = () => {
//     logout()
//     navigate("/")
//     setIsMenuOpen(false)
//   }

//   const closeMobileMenu = () => {
//     setIsMenuOpen(false)
//   }

//   const getDashboardLink = () => {
//     if (!user) return "/"
//     switch (user.role) {
//       case "doctor":
//         return "/doctor-dashboard"
//       case "therapist":
//         return "/therapist-dashboard"
//       case "patient":
//         return "/patient-dashboard"
//       default:
//         return "/"
//     }
//   }

//   const handleDropdownEnter = () => {
//     if (dropdownTimeout) {
//       clearTimeout(dropdownTimeout)
//       setDropdownTimeout(null)
//     }
//   }

//   const handleDropdownLeave = () => {
//     const timeout = setTimeout(() => {
//       setIsAboutDropdownOpen(false)
//     }, 100)
//     setDropdownTimeout(timeout)
//   }

//   return (
//     <>
//       <style>
//         {`
//           /* ===== NAVBAR RESPONSIVE STYLES ===== */
          
//           /* DESKTOP (Default - 769px+) */
//           .desktop-nav { 
//             display: flex !important; 
//             gap: 1.5rem;
//             align-items: center;
//           }
//           .mobile-menu-btn { 
//             display: none !important; 
//           }
//           .mobile-menu {
//             display: none;
//           }
          
//           /* TABLET (768px - 1024px) */
//           @media screen and (min-width: 768px) and (max-width: 1024px) {
//             .desktop-nav {
//               gap: 1rem !important;
//             }
//             .desktop-nav a {
//               font-size: 0.85rem !important;
//               padding: 0.375rem 0 !important;
//             }
//             .navbar-container {
//               padding: 0.75rem 1.5rem !important;
//             }
//           }
          
//           /* MOBILE (0px - 767px) */
//           @media screen and (max-width: 767px) {
//             .desktop-nav { 
//               display: none !important; 
//             }
//             .mobile-menu-btn { 
//               display: block !important; 
//               padding: 0.75rem !important;
//               border-radius: 0.5rem !important;
//             }
//             .navbar-container {
//               padding: 1rem !important;
//             }
//             .navbar-logo h1 {
//               font-size: 1.125rem !important;
//             }
//             .navbar-logo p {
//               font-size: 0.7rem !important;
//             }
//             .mobile-menu {
//               position: absolute !important;
//               top: 100% !important;
//               left: 0 !important;
//               right: 0 !important;
//               background: white !important;
//               border-top: 1px solid #e5e7eb !important;
//               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
//               z-index: 1000 !important;
//               padding: 1rem 0 !important;
//               max-height: calc(100vh - 80px) !important;
//               overflow-y: auto !important;
//             }
//             .mobile-menu.open {
//               display: block !important;
//             }
//             .mobile-menu a {
//               display: block !important;
//               padding: 1rem 1.5rem !important;
//               color: #374151 !important;
//               text-decoration: none !important;
//               font-size: 1rem !important;
//               font-weight: 500 !important;
//               border-bottom: 1px solid #f3f4f6 !important;
//               transition: all 0.2s ease !important;
//             }
//             .mobile-menu a:hover {
//               background-color: #f0fdf4 !important;
//               color: #15803d !important;
//               padding-left: 2rem !important;
//             }
//           }
          
//           /* SMALL MOBILE (320px - 480px) */
//           @media screen and (max-width: 480px) {
//             .navbar-container {
//               padding: 0.75rem !important;
//             }
//             .navbar-logo h1 {
//               font-size: 1rem !important;
//             }
//             .navbar-logo p {
//               font-size: 0.65rem !important;
//             }
//             .mobile-menu a {
//               padding: 0.875rem 1.25rem !important;
//               font-size: 0.9rem !important;
//             }
//             overflow: visible;
//             white-space: nowrap;
//           }
//         `}
//       </style>
//       <nav
//         style={{
//           backgroundColor: "white",
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
//           position: "sticky",
//           top: 0,
//           zIndex: 50,
//           borderBottom: "1px solid #e5e7eb",
//         }}
//       >
//         <div className="container">
//           <div
//             className="flex items-center"
//             style={{
//               padding: "1.25rem 0",
//               justifyContent: "space-between",
//               width: "100%",
//             }}
//           >
//             {/* Logo */}
//             <Link
//               to="/"
//               style={{
//                 textDecoration: "none",
//                 flexShrink: 0,
//               }}
//             >
//               <div className="flex items-center" style={{ gap: "0.875rem" }}>
//                 <img 
//                   src="/ayursutra-logo.png" 
//                   alt="AyurSutra Logo" 
//                   style={{
//                     width: "45px",
//                     height: "45px",
//                     objectFit: "contain"
//                   }}
//                 />
//                 <div>
//                   <h1
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "700",
//                       color: "#059669",
//                       margin: 0,
//                       letterSpacing: "-0.025em",
//                     }}
//                   >
//                     AYURSUTRA
//                   </h1>
//                   <p
//                     style={{
//                       fontSize: "0.75rem",
//                       color: "#059669",
//                       margin: 0,
//                       fontWeight: "500",
//                       opacity: 0.8,
//                     }}
//                   >
//                     PANCHAKARMA SOFTWARE
//                   </p>
//                 </div>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <div
//               className="flex items-center desktop-nav"
//               style={{
//                 display: "flex",
//                 gap: "1.5rem",
//                 alignItems: "center",
//                 flexWrap: "nowrap",
//               }}
//             >
//               {/* Navigation Links */}
//               <div
//                 className="flex items-center"
//                 style={{
//                   gap: "1.5rem",
//                   alignItems: "center",
//                   flexWrap: "nowrap",
//                 }}
//               >
//                 <Link
//                   to="/"
//                   style={{
//                     color: "#374151",
//                     textDecoration: "none",
//                     fontWeight: "600",
//                     fontSize: "0.9rem",
//                     transition: "all 0.2s ease",
//                     padding: "0.5rem 0",
//                     position: "relative",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/contact-us"
//                   style={{
//                     color: "#374151",
//                     textDecoration: "none",
//                     fontWeight: "600",
//                     fontSize: "0.9rem",
//                     transition: "all 0.2s ease",
//                     padding: "0.5rem 0",
//                     position: "relative",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   Contact Us
//                 </Link>
//                 <Link
//                   to="/blogs"
//                   style={{
//                     color: "#374151",
//                     textDecoration: "none",
//                     fontWeight: "600",
//                     fontSize: "0.9rem",
//                     transition: "all 0.2s ease",
//                     padding: "0.5rem 0",
//                     position: "relative",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   Blogs
//                 </Link>
//                 <Link
//                   to="/patient-stories"
//                   style={{
//                     color: "#374151",
//                     textDecoration: "none",
//                     fontWeight: "600",
//                     fontSize: "0.9rem",
//                     transition: "all 0.2s ease",
//                     padding: "0.5rem 0",
//                     position: "relative",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   Patient Stories
//                 </Link>
//               </div>

//               {/* Auth Buttons */}
//               <div className="flex items-center" style={{ gap: "1rem" }}>
//                 {isAuthenticated ? (
//                   <>
//                     <Link
//                       to={getDashboardLink()}
//                       style={{
//                         padding: "0.625rem 1.25rem",
//                         background: "linear-gradient(135deg, #6d28d9, #059669)",
//                         color: "white",
//                         textDecoration: "none",
//                         borderRadius: "0.5rem",
//                         fontWeight: "500",
//                         fontSize: "0.875rem",
//                         transition: "all 0.15s ease",
//                       }}
//                     >
//                       Dashboard
//                     </Link>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "1rem",
//                         paddingLeft: "1rem",
//                         borderLeft: "1px solid #d1d5db",
//                       }}
//                     >
//                       <span
//                         style={{
//                           color: "#6b7280",
//                           fontSize: "0.875rem",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         Welcome, {user.name}
//                       </span>
//                       <button
//                         onClick={handleLogout}
//                         style={{
//                           padding: "0.625rem 1.25rem",
//                           background: "linear-gradient(135deg, #6d28d9, #059669)",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "0.5rem",
//                           fontWeight: "bold",
//                           fontSize: "0.875rem",
//                           cursor: "pointer",
//                           transition: "all 0.15s ease",
//                         }}
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/login"
//                       style={{
//                         padding: "0.625rem 1.25rem",
//                         background: "linear-gradient(135deg, #6d28d9, #059669)",
//                         color: "white",
//                         textDecoration: "none",
//                         borderRadius: "0.5rem",
//                         fontWeight: "500",
//                         fontSize: "0.875rem",
//                         transition: "all 0.15s ease",
//                       }}
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       to="/register"
//                       style={{
//                         padding: "0.625rem 1.25rem",
//                         background: "linear-gradient(135deg, #6d28d9, #059669)",
//                         color: "white",
//                         textDecoration: "none",
//                         borderRadius: "0.5rem",
//                         fontWeight: "500",
//                         fontSize: "0.875rem",
//                         transition: "all 0.15s ease",
//                         border: "none",
//                       }}
//                     >
//                       Register
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="mobile-menu-btn"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               style={{
//                 padding: "0.5rem",
//                 border: "none",
//                 background: "none",
//                 cursor: "pointer",
//                 borderRadius: "0.375rem",
//               }}
//             >
//               <div
//                 style={{
//                   width: "24px",
//                   height: "2px",
//                   backgroundColor: "#374151",
//                   margin: "4px 0",
//                   borderRadius: "1px",
//                   transition: "all 0.3s ease",
//                 }}
//               ></div>
//               <div
//                 style={{
//                   width: "24px",
//                   height: "2px",
//                   backgroundColor: "#374151",
//                   margin: "4px 0",
//                   borderRadius: "1px",
//                   transition: "all 0.3s ease",
//                 }}
//               ></div>
//               <div
//                 style={{
//                   width: "24px",
//                   height: "2px",
//                   backgroundColor: "#374151",
//                   margin: "4px 0",
//                   borderRadius: "1px",
//                   transition: "all 0.3s ease",
//                 }}
//               ></div>
//             </button>
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Navbar


"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setIsMobileAboutOpen(false)
    setIsAboutDropdownOpen(false)
  }

  const getDashboardLink = () => {
    if (!user) return "/"
    switch (user.role) {
      case "doctor":
        return "/doctor-dashboard"
      case "therapist":
        return "/therapist-dashboard"
      case "patient":
        return "/patient-dashboard"
      default:
        return "/"
    }
  }

  const toggleMobileAbout = () => {
    setIsMobileAboutOpen(!isMobileAboutOpen)
  }

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen)
  }

  // Dropdown only closes when clicking menu items, not when clicking outside

  return (
    <>
      <style>
        {`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            width: 100%;
            box-sizing: border-box;
          }
          
          /* MOBILE FIRST - Force mobile styles */
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: block !important;
            padding: 0.75rem;
            background: none;
            border: none;
            cursor: pointer;
          }
          
          .desktop-auth-buttons {
            display: none !important;
          }
          
          .mobile-auth-buttons {
            display: flex !important;
            gap: 0.25rem !important;
            align-items: center !important;
            margin-left: auto !important;
            flex-shrink: 0 !important;
          }
          
          .mobile-auth-buttons a {
            padding: 0.375rem 0.5rem !important;
            font-size: 0.7rem !important;
            border-radius: 0.25rem !important;
            white-space: nowrap !important;
            min-width: auto !important;
          }
          
          /* Mobile About Us Submenu */
          .mobile-about-submenu {
            background: var(--gray-50) !important;
            border-left: 3px solid var(--ayur-500) !important;
            margin-left: 1rem !important;
            border-radius: 0.5rem !important;
          }
          
          .mobile-about-submenu a {
            padding: 0.75rem 1rem !important;
            font-size: 0.85rem !important;
            color: var(--gray-600) !important;
          }
          
          nav {
            padding: 0.75rem 0;
            background: white;
            border-bottom: 1px solid #e5e7eb;
            position: sticky;
            top: 0;
            z-index: 9999998;
            width: 100%;
            max-width: 100vw;
            overflow-x: hidden;
          }
          
          /* HORIZONTAL FLEX DROPDOWN - CLICK ONLY */
          .desktop-about-dropdown {
            background: white !important;
            border: none !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            z-index: 999999 !important;
            position: absolute !important;
            top: calc(100% + 5px) !important;
            left: 0 !important;
            flex-direction: row !important;
            gap: 1rem !important;
            padding: 8px 16px !important;
            border-radius: 8px !important;
            white-space: nowrap !important;
          }
          
          
          /* TABLET AND DESKTOP - Show desktop nav */
          @media screen and (min-width: 768px) {
            .navbar-content {
              display: flex;
              align-items: center;
              justify-content: space-between;
              position: relative;
              width: 100%;
              max-width: 100%;
              overflow: visible;
              z-index: 2147483645;
            }
            
            .desktop-nav {
              display: flex !important;
              gap: 0.1rem;
              align-items: center;
              flex-wrap: nowrap;
              overflow: visible;
              white-space: nowrap;
              flex: 1;
              justify-content: center;
              margin-left: 1rem;
              margin-right: 1rem;
              max-width: calc(100vw - 600px);
            }
            
            .mobile-menu-btn {
              display: none !important;
            }
            
            .desktop-auth-buttons {
              display: flex !important;
              flex-direction: row !important;
              gap: 1rem !important;
              align-items: center !important;
            }
            
            .desktop-auth-buttons a,
            .desktop-auth-buttons button {
              width: auto !important;
              flex-shrink: 0 !important;
            }
            
            .mobile-auth-buttons {
              display: none !important;
            }
            
            /* Desktop About Us Dropdown - FORCE VISIBLE */
            .about-dropdown-container {
              position: relative !important;
            }
            
            /* Remove all hover-based dropdown behavior */
            .about-dropdown-container {
              position: relative !important;
            }
            
            .desktop-about-dropdown {
              position: absolute !important;
              top: calc(100% + 5px) !important;
              left: 0 !important;
              flex-direction: row !important;
              background: white !important;
              border-radius: 8px !important;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
              border: none !important;
              padding: 8px 16px !important;
              z-index: 999999 !important;
              gap: 1rem !important;
              white-space: nowrap !important;
            }
            
            @keyframes fadeInDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          }
          
          /* MOBILE STYLES */
          @media screen and (max-width: 767px) {
            .container {
              padding: 0 1rem;
            }
            
            nav {
              padding: 0.75rem 0 !important;
            }
            
            .logo-text h1 {
              font-size: 1.25rem !important;
            }
            
            .logo-text p {
              font-size: 0.65rem !important;
            }
            
            .logo-icon {
              width: 35px !important;
              height: 35px !important;
            }
            
            .mobile-menu {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: white;
              border-top: 1px solid #e5e7eb;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              z-index: 1000;
              padding: 0.75rem 0;
              max-height: 85vh;
              overflow-y: auto;
            }
            
            .mobile-menu a {
              display: block !important;
              padding: 0.75rem 1.25rem !important;
              color: #374151 !important;
              text-decoration: none !important;
              font-size: 0.9rem !important;
              font-weight: bold !important;
              border-bottom: 1px solid #f3f4f6;
            }
            
            .mobile-menu a:hover {
              background-color: #f0fdf4 !important;
              color: #16a34a !important;
            }
            
            .mobile-menu .auth-buttons {
              padding: 1rem !important;
              border-top: 1px solid #e5e7eb !important;
              display: flex !important;
              flex-direction: column !important;
              gap: 0.75rem !important;
            }
            
            .mobile-menu .auth-buttons a,
            .mobile-menu .auth-buttons button {
              width: 100% !important;
              padding: 1rem !important;
              text-align: center !important;
              font-size: 1rem !important;
              border-radius: 0.5rem !important;
            }
          }
        `}
      </style>
      <nav
        style={{
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--gray-200)",
        }}
      >
        <div className="container">
          <div
            className="flex items-center"
            style={{
              padding: "1.25rem 0",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <div className="flex items-center" style={{ gap: "0.875rem" }}>
                <div
                  className="logo-icon"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "linear-gradient(135deg, var(--primary-600), var(--ayur-600))",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.125rem",
                    boxShadow: "0 4px 12px rgba(34, 197, 94, 0.25)",
                  }}
                >
                  A
                </div>
                <div className="logo-text">
                  <h1
                    style={{
                      fontSize: "1.375rem",
                      fontWeight: "700",
                      color: "var(--gray-900)",
                      margin: 0,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    AyurSutra
                  </h1>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--gray-500)",
                      margin: 0,
                      fontWeight: "500",
                    }}
                  >
                    Panchakarma Management
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Middle Left */}
            <div
              className="desktop-nav"
              style={{
                display: "flex",
                gap: "0.1rem",
                alignItems: "center",
                flexWrap: "nowrap",
                flex: "1",
                justifyContent: "center",
                marginLeft: "1rem",
                marginRight: "1rem",
                maxWidth: "calc(100vw - 600px)",
              }}
            >
                <Link
                  to="/"
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    padding: "0.5rem 0",
                    position: "relative",
                    whiteSpace: "nowrap",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "var(--ayur-600)"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "var(--gray-700)"
                  }}
                >
                  Home
                </Link>
                <div className="about-dropdown-container" style={{ position: "relative" }}>
                  <div
                    onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                    style={{
                      color: "var(--gray-700)",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      transition: "all 0.05s ease",
                      padding: "0.5rem 0",
                      position: "relative",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "var(--ayur-600)"
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "var(--gray-700)"
                    }}
                  >
                    About Us
                  </div>

                  {/* Desktop Dropdown Menu */}
                  {isAboutDropdownOpen && (
                    <div className="desktop-about-dropdown" style={{ display: 'flex', flexDirection: 'row' }}>
                    <Link
                      to="/overview"
                      onClick={() => setIsAboutDropdownOpen(false)}
                        style={{
                          display: "block",
                          padding: "0.75rem 1.25rem",
                          color: "var(--gray-700)",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                          transition: "all 0.05s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "var(--ayur-50)"
                          e.target.style.color = "var(--ayur-700)"
                          e.target.style.paddingLeft = "1.5rem"
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent"
                          e.target.style.color = "var(--gray-700)"
                          e.target.style.paddingLeft = "1.25rem"
                        }}
                      >
                        📋 Overview
                      </Link>
                      <Link
                        to="/mission-vision"
                        onClick={() => setIsAboutDropdownOpen(false)}
                        style={{
                          display: "block",
                          padding: "0.75rem 1.25rem",
                          color: "var(--gray-700)",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                          transition: "all 0.05s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "var(--ayur-50)"
                          e.target.style.color = "var(--ayur-700)"
                          e.target.style.paddingLeft = "1.5rem"
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent"
                          e.target.style.color = "var(--gray-700)"
                          e.target.style.paddingLeft = "1.25rem"
                        }}
                      >
                        🎯 Mission and Vision
                      </Link>
                      <Link
                        to="/therapies"
                        onClick={() => setIsAboutDropdownOpen(false)}
                        style={{
                          display: "block",
                          padding: "0.75rem 1.25rem",
                          color: "var(--gray-700)",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                          transition: "all 0.05s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "var(--ayur-50)"
                          e.target.style.color = "var(--ayur-700)"
                          e.target.style.paddingLeft = "1.5rem"
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent"
                          e.target.style.color = "var(--gray-700)"
                          e.target.style.paddingLeft = "1.25rem"
                        }}
                      >
                        💆‍♀️ Therapies
                      </Link>
                      <Link
                        to="/what-is-panchakarma"
                        onClick={() => setIsAboutDropdownOpen(false)}
                        style={{
                          display: "block",
                          padding: "0.75rem 1.25rem",
                          color: "var(--gray-700)",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                          transition: "all 0.05s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "var(--ayur-50)"
                          e.target.style.color = "var(--ayur-700)"
                          e.target.style.paddingLeft = "1.5rem"
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent"
                          e.target.style.color = "var(--gray-700)"
                          e.target.style.paddingLeft = "1.25rem"
                        }}
                      >
                        🧘‍♂️ What is Panchakarma
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/blogs"
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    padding: "0.5rem 0",
                    position: "relative",
                    whiteSpace: "nowrap",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "var(--ayur-600)"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "var(--gray-700)"
                  }}
                >
                  Blogs
                </Link>
                {/* Patient Stories Link */}
                <Link
                  to="/patient-stories"
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    padding: "0.5rem 0",
                    position: "relative",
                    whiteSpace: "nowrap",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "var(--ayur-600)"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "var(--gray-700)"
                  }}
                >
                  Patient Stories
                </Link>
                {/* Locate Us Link */}
                <Link
                  to="/locate-us"
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    padding: "0.5rem 0",
                    position: "relative",
                    whiteSpace: "nowrap",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "var(--ayur-600)"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "var(--gray-700)"
                  }}
                >
                  Locate Us
                </Link>
                <Link
                  to="/contact-us"
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    padding: "0.5rem 0",
                    position: "relative",
                    whiteSpace: "nowrap",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "var(--ayur-600)"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "var(--gray-700)"
                  }}
                >
                  Contact Us
                </Link>
            </div>

            {/* Mobile Auth Buttons - Always Visible */}
            <div className="mobile-auth-buttons" style={{ 
              display: "flex", 
              gap: "0.25rem", 
              alignItems: "center",
              flexShrink: 0,
              marginLeft: "auto"
            }}>
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    style={{
                      padding: "0.375rem 0.5rem",
                      background: "linear-gradient(135deg, var(--primary-600), var(--ayur-600))",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                      fontSize: "0.7rem",
                      transition: "all 0.15s ease",
                      whiteSpace: "nowrap",
                      minWidth: "auto"
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    style={{
                      padding: "0.375rem 0.5rem",
                      background: "linear-gradient(135deg, var(--primary-600), var(--ayur-600))",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                      fontSize: "0.7rem",
                      transition: "all 0.15s ease",
                      whiteSpace: "nowrap",
                      minWidth: "auto"
                    }}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Desktop Auth Buttons - Right Side */}
            <div className="desktop-auth-buttons flex items-center" style={{ 
              display: "flex", 
              flexDirection: "row", 
              gap: "0.75rem", 
              alignItems: "center",
              flexShrink: 0,
              minWidth: "200px",
              justifyContent: "flex-end"
            }}>
                {isAuthenticated ? (
                  <>
                    <Link
                      to={getDashboardLink()}
                      style={{
                        padding: "0.625rem 1.25rem",
                        background: "linear-gradient(135deg, var(--primary-600), var(--ayur-600))",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "0.5rem",
                        fontWeight: "500",
                        fontSize: "0.875rem",
                        transition: "all 0.15s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.opacity = "0.9"
                        e.target.style.transform = "translateY(-1px)"
                      }}
                      onMouseOut={(e) => {
                        e.target.style.opacity = "1"
                        e.target.style.transform = "translateY(0)"
                      }}
                    >
                      Dashboard
                    </Link>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        paddingLeft: "1rem",
                        borderLeft: "1px solid var(--gray-300)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--gray-600)",
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                        }}
                      >
                        Welcome, {user.name}
                      </span>
                      <button
                        onClick={handleLogout}
                        style={{
                          padding: "0.625rem 1.25rem",
                          background: "linear-gradient(135deg, var(--primary-600), var(--ayur-600))",
                          color: "white",
                          border: "none",
                          borderRadius: "0.5rem",
                          fontWeight: "bold",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-1px)"
                          e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)"
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)"
                          e.target.style.boxShadow = "none"
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      style={{
                        padding: "0.625rem 1.25rem",
                        background: "linear-gradient(135deg, var(--primary-600), var(--ayur-600))",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "0.5rem",
                        fontWeight: "500",
                        fontSize: "0.875rem",
                        transition: "all 0.15s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.opacity = "0.9"
                        e.target.style.transform = "translateY(-1px)"
                      }}
                      onMouseOut={(e) => {
                        e.target.style.opacity = "1"
                        e.target.style.transform = "translateY(0)"
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      style={{
                        padding: "0.625rem 1.25rem",
                        background: "linear-gradient(135deg, var(--primary-600), var(--ayur-600))",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "0.5rem",
                        fontWeight: "500",
                        fontSize: "0.875rem",
                        transition: "all 0.15s ease",
                        border: "none",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-1px)"
                        e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)"
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)"
                        e.target.style.boxShadow = "none"
                      }}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                padding: "0.5rem",
                border: "none",
                background: "none",
                cursor: "pointer",
                borderRadius: "0.375rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "var(--gray-700)",
                  margin: "4px 0",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                }}
              ></div>
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "var(--gray-700)",
                  margin: "4px 0",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                }}
              ></div>
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "var(--gray-700)",
                  margin: "4px 0",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                }}
              ></div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
              {/* Mobile Navigation Links */}
              <div>
                <Link
                  to="/"
                  className="nav-link"
                  onClick={closeMobileMenu}
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  🏠 Home
                </Link>
                
                {/* About Us Section with Toggle */}
                <div>
                  <button
                    onClick={toggleMobileAbout}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem 1.25rem",
                      background: "none",
                      border: "none",
                      color: "var(--gray-700)",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      textAlign: "left",
                      cursor: "pointer",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    <span>ℹ️ About Us</span>
                    <span style={{ transform: isMobileAboutOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>▼</span>
                  </button>
                  
                  {isMobileAboutOpen && (
                    <div className="mobile-about-submenu">
                      <Link
                        to="/overview"
                        onClick={closeMobileMenu}
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem",
                          color: "var(--gray-600)",
                          textDecoration: "none",
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          transition: "all 0.05s ease",
                        }}
                      >
                        📋 Overview
                      </Link>
                      <Link
                        to="/mission-vision"
                        onClick={closeMobileMenu}
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem",
                          color: "var(--gray-600)",
                          textDecoration: "none",
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          transition: "all 0.05s ease",
                        }}
                      >
                        🎯 Mission and Vision
                      </Link>
                      <Link
                        to="/therapies"
                        onClick={closeMobileMenu}
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem",
                          color: "var(--gray-600)",
                          textDecoration: "none",
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          transition: "all 0.05s ease",
                        }}
                      >
                        💆‍♀️ Therapies
                      </Link>
                      <Link
                        to="/what-is-panchakarma"
                        onClick={closeMobileMenu}
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem",
                          color: "var(--gray-600)",
                          textDecoration: "none",
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          transition: "all 0.05s ease",
                        }}
                      >
                        🧘‍♂️ What is Panchakarma
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/blogs"
                  onClick={closeMobileMenu}
                  className="nav-link"
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  📝 Blogs
                </Link>
                <Link
                  to="/patient-stories"
                  onClick={closeMobileMenu}
                  className="nav-link"
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  💬 Patient Stories
                </Link>
                <Link
                  to="/locate-us"
                  onClick={closeMobileMenu}
                  className="nav-link"
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  📍 Locate Us
                </Link>
                <Link
                  to="/contact-us"
                  onClick={closeMobileMenu}
                  className="nav-link"
                  style={{
                    color: "var(--gray-700)",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  📞 Contact Us
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="auth-buttons">
                {isAuthenticated ? (
                  <>
                    <span className="user-welcome">Welcome, {user.name}</span>
                    <Link
                      to={getDashboardLink()}
                      style={{
                        padding: "0.875rem 1.25rem",
                        background: "linear-gradient(135deg, var(--primary-600), var(--ayur-600))",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "0.75rem",
                        fontWeight: "500",
                        fontSize: "0.875rem",
                        textAlign: "center",
                        transition: "all 0.15s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.opacity = "0.9"
                        e.target.style.transform = "translateY(-1px)"
                      }}
                      onMouseOut={(e) => {
                        e.target.style.opacity = "1"
                        e.target.style.transform = "translateY(0)"
                      }}
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="btn btn-primary">
                      Logout
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar