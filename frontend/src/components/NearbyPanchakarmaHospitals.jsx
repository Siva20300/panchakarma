import React, { useState, useEffect, useRef } from 'react';

const NearbyPanchakarmaHospitals = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);

  // Your Google Maps API key - replace with your actual API key
  const GOOGLE_MAPS_API_KEY = 'your-actual-api-key-here';

  useEffect(() => {
    // Don't auto-request location, wait for user permission
    setShowPermissionDialog(true);
  }, []);

  const handlePermissionGrant = () => {
    setShowPermissionDialog(false);
    setPermissionRequested(true);
    setLoading(true);
    requestUserLocation();
  };

  const handlePermissionDeny = () => {
    setShowPermissionDialog(false);
    setPermissionRequested(true);
    setError("Location permission denied. You can still view hospitals but won't see your location on the map.");
    loadDummyHospitals();
  };

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      loadDummyHospitals();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setError(null);
        loadGoogleMaps(location);
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Location access denied.";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable location services in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
        loadDummyHospitals();
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  };

  const loadDummyHospitals = () => {
    // Load some dummy hospital data when location is not available
    const dummyHospitals = [
      {
        name: "Ayursutra Panchakarma Center",
        vicinity: "MG Road, Bangalore",
        rating: 4.5,
        user_ratings_total: 120,
        opening_hours: { open_now: true },
        place_id: "dummy1"
      },
      {
        name: "Kerala Ayurveda Hospital",
        vicinity: "Jayanagar, Bangalore",
        rating: 4.3,
        user_ratings_total: 89,
        opening_hours: { open_now: false },
        place_id: "dummy2"
      },
      {
        name: "Panchakarma Wellness Center",
        vicinity: "Koramangala, Bangalore",
        rating: 4.7,
        user_ratings_total: 156,
        opening_hours: { open_now: true },
        place_id: "dummy3"
      }
    ];
    setHospitals(dummyHospitals);
    setLoading(false);
  };

  const loadGoogleMaps = (location) => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap(location);
      return;
    }

    // Load Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => initializeMap(location);
    script.onerror = () => {
      setError("Failed to load Google Maps");
      setLoading(false);
    };
    document.head.appendChild(script);
  };

  const initializeMap = (location) => {
    if (!mapRef.current) return;

    // Create map
    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 13,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi.medical",
          stylers: [{ visibility: "on" }]
        }
      ]
    });

    googleMapRef.current = map;

    // Add blue marker for user's location
    new window.google.maps.Marker({
      position: location,
      map: map,
      title: "Your Location",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }
    });

    // Search for nearby Panchakarma hospitals
    searchNearbyHospitals(map, location);
  };

  const searchNearbyHospitals = (map, location) => {
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: location,
      radius: 5000, // 5 km radius
      keyword: 'panchakarma hospital ayurveda clinic',
      type: ['hospital', 'health']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const panchakarmaHospitals = results.filter(place => 
          place.name.toLowerCase().includes('panchakarma') ||
          place.name.toLowerCase().includes('ayurveda') ||
          place.name.toLowerCase().includes('ayurvedic') ||
          place.types.includes('hospital') ||
          place.types.includes('health')
        );

        setHospitals(panchakarmaHospitals);
        addHospitalMarkers(map, panchakarmaHospitals);
      } else {
        console.error("Places search failed:", status);
        // Fallback: search for general hospitals and clinics
        searchGeneralHealthcare(map, location);
      }
      setLoading(false);
    });
  };

  const searchGeneralHealthcare = (map, location) => {
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: location,
      radius: 5000,
      type: ['hospital', 'health'],
      keyword: 'ayurveda clinic hospital healthcare'
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setHospitals(results.slice(0, 10)); // Limit to 10 results
        addHospitalMarkers(map, results.slice(0, 10));
      }
      setLoading(false);
    });
  };

  const addHospitalMarkers = (map, hospitals) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    hospitals.forEach((hospital, index) => {
      const marker = new window.google.maps.Marker({
        position: hospital.geometry.location,
        map: map,
        title: hospital.name,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 250px;">
            <h4 style="margin: 0 0 5px 0; color: #333;">${hospital.name}</h4>
            <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">${hospital.vicinity}</p>
            <p style="margin: 0; font-size: 12px;">
              <strong>Rating:</strong> ${hospital.rating || 'N/A'} ⭐
            </p>
            ${hospital.opening_hours ? 
              `<p style="margin: 5px 0 0 0; font-size: 12px; color: ${hospital.opening_hours.open_now ? 'green' : 'red'};">
                ${hospital.opening_hours.open_now ? 'Open Now' : 'Closed'}
              </p>` : ''
            }
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Nearby Panchakarma Hospitals
          </h3>
        </div>
        <div className="card-body">
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: 'var(--gray-500)'
          }}>
            <div style={{ marginBottom: '1rem' }}>📍</div>
            <p>Getting your location and finding nearby hospitals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && hospitals.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Nearby Panchakarma Hospitals
          </h3>
        </div>
        <div className="card-body">
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            backgroundColor: 'var(--warning-50)',
            borderRadius: '0.5rem',
            border: '1px solid var(--warning-200)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: 'var(--warning-700)'
            }}>
              Location Access Issue
            </h4>
            <p style={{ color: 'var(--gray-700)', marginBottom: '1.5rem' }}>{error}</p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => {
                  setError(null);
                  setShowPermissionDialog(true);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--primary-600)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                📍 Try Location Again
              </button>
              <button 
                onClick={() => {
                  setError(null);
                  loadDummyHospitals();
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--gray-200)',
                  color: 'var(--gray-700)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                🏥 Show Popular Hospitals
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Permission Dialog
  if (showPermissionDialog) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Nearby Panchakarma Hospitals
          </h3>
        </div>
        <div className="card-body">
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            backgroundColor: 'var(--primary-50)',
            borderRadius: '0.5rem',
            border: '1px solid var(--primary-200)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
            <h4 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: 'var(--primary-700)'
            }}>
              Location Access Required
            </h4>
            <p style={{ 
              color: 'var(--gray-700)', 
              marginBottom: '1.5rem',
              lineHeight: '1.5'
            }}>
              To show you nearby Panchakarma hospitals and their exact locations on the map, 
              we need access to your current location. This helps us provide personalized 
              recommendations based on your proximity.
            </p>
            
            <div style={{ 
              backgroundColor: 'var(--info-50)', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--info-200)'
            }}>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'var(--info-700)', 
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                🔒 <strong>Privacy:</strong> Your location is only used to find nearby hospitals and is not stored or shared.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={handlePermissionGrant}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--primary-600)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--primary-700)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'var(--primary-600)';
                }}
              >
                📍 Allow Location Access
              </button>
              <button 
                onClick={handlePermissionDeny}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--gray-200)',
                  color: 'var(--gray-700)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--gray-300)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'var(--gray-200)';
                }}
              >
                Skip for Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          Nearby Panchakarma Hospitals
        </h3>
        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
          {userLocation ? 
            'Find Panchakarma and Ayurvedic hospitals within 5km of your location' :
            'Showing popular Panchakarma hospitals in your area'
          }
        </p>
      </div>
      <div className="card-body">
        {/* Google Map */}
        <div 
          ref={mapRef}
          style={{ 
            width: '100%', 
            height: '500px', 
            borderRadius: '0.5rem',
            marginBottom: '1.5rem'
          }}
        />

        {/* Hospital List */}
        {hospitals.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: 'var(--gray-900)',
                margin: 0
              }}>
                {userLocation ? `Found ${hospitals.length} Healthcare Facilities` : `Popular Panchakarma Hospitals`}
              </h4>
              {!userLocation && (
                <button 
                  onClick={() => setShowPermissionDialog(true)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--primary-100)',
                    color: 'var(--primary-700)',
                    border: '1px solid var(--primary-300)',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  📍 Enable Location for Distance
                </button>
              )}
            </div>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {hospitals.map((hospital, index) => {
                const distance = userLocation && hospital.geometry ? 
                  calculateDistance(
                    userLocation.lat, 
                    userLocation.lng,
                    hospital.geometry.location.lat(),
                    hospital.geometry.location.lng()
                  ).toFixed(1) : null;

                return (
                  <div 
                    key={hospital.place_id || index}
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--gray-200)',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--gray-50)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-50)';
                      e.currentTarget.style.borderColor = 'var(--primary-200)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                      e.currentTarget.style.borderColor = 'var(--gray-200)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h5 style={{ 
                          fontWeight: 'bold', 
                          marginBottom: '0.5rem',
                          color: 'var(--gray-900)'
                        }}>
                          🏥 {hospital.name}
                        </h5>
                        <p style={{ 
                          margin: '0.25rem 0', 
                          fontSize: '0.875rem', 
                          color: 'var(--gray-600)' 
                        }}>
                          📍 {hospital.vicinity}
                        </p>
                        {hospital.rating && (
                          <p style={{ 
                            margin: '0.25rem 0', 
                            fontSize: '0.875rem', 
                            color: 'var(--gray-600)' 
                          }}>
                            ⭐ {hospital.rating} ({hospital.user_ratings_total || 0} reviews)
                          </p>
                        )}
                        {hospital.opening_hours && (
                          <p style={{ 
                            margin: '0.25rem 0', 
                            fontSize: '0.875rem',
                            color: hospital.opening_hours.open_now ? 'var(--success-600)' : 'var(--red-600)',
                            fontWeight: '500'
                          }}>
                            {hospital.opening_hours.open_now ? '🟢 Open Now' : '🔴 Closed'}
                          </p>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {distance ? (
                          <div style={{ 
                            fontSize: '0.875rem', 
                            fontWeight: 'bold', 
                            color: 'var(--primary-600)',
                            marginBottom: '0.5rem'
                          }}>
                            {distance} km away
                          </div>
                        ) : (
                          <div style={{ 
                            fontSize: '0.75rem', 
                            color: 'var(--gray-500)',
                            marginBottom: '0.5rem'
                          }}>
                            Enable location for distance
                          </div>
                        )}
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                          {userLocation ? 'Click marker for details' : 'Popular in your area'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {hospitals.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: 'var(--gray-500)'
          }}>
            <div style={{ marginBottom: '1rem' }}>🏥</div>
            <p>No Panchakarma hospitals found within 5km of your location.</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Try expanding your search radius or check nearby areas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyPanchakarmaHospitals;
