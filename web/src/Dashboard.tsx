import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [profileData, setProfileData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (!auth) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8080/api/user/me', {
            headers: { 'Authorization': auth }
        })
        .then(res => setProfileData(res.data))
        .catch(() => setProfileData({ error: 'Error loading profile' }));
    }, [navigate]);

    return (
        <div className="container"> {/* Added class for styling */}
            <h1>Dashboard</h1>
              <div style={{ textAlign: 'left', background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Server Response:</p>
                  <pre style={{ margin: '5px 0 0 0', color: '#333', whiteSpace: 'pre-wrap' }}>
                    {profileData ? JSON.stringify(profileData, null, 2) : 'No data'}
                  </pre>
              </div>
            
            <button 
                className="logout-btn" 
                onClick={() => { localStorage.clear(); navigate('/login'); }}
            >
                Logout
            </button>
        </div>
    );
}
export default Dashboard;