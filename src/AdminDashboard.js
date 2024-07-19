import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [apiKey, setApiKey] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        // Fethcing users and settings
        axios.get('/api/admin/users').then((response) => setUsers(response.data)); 
        axios.get('/api/admin/settings').then((response) => {
            setApiKey(response.data.apiKey);
            setCity(response.data.city);
        });
    }, []);

    const handleUpdateSettings = () => {
        axios.post('/api/admin/settings', { apiKey, city }).then((response) => {
            alert('Settings updated');
        });
    };

    const handleBlockedUser = (userId) =>{
        axios.post(`/api/admin/users/${userId}/block`).then((response) => {
            setUsers(users.map((user) =>(
                user.id === userId? {...user, isBlocked: true} : user
            )));
        });
    };

    const handleDeletedUser = (userId) =>{
        axios.delete(`/api/admin/users/${userId}`).then((response) => {
            setUsers(users.filter((user) => user.id !== userId));
        });
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Settings</h2>
                <input
                    type = "text"
                    value = {apiKey}
                    onChnage = {(e) => setApiKey(e.target.value)}
                    placeholder='API Key'
                />
                <input
                    type = "text"
                    value = {city}
                    onChnage = {(e) => setCity(e.target.value)}
                    placeholder='City'
                />
                <button onClick={handleUpdateSettings}>Update Settings</button>
            </div>
            <div>
                <h2>Users</h2>
                <ul>
                    {users.map((user) => 
                        <li key={user.id}>
                            {user.email} {user.blocked ? '(Blocked)' : ''}
                            <button onClick={() => handleBlockUser(user.id)}>Block</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;