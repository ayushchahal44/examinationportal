import React from 'react';

const Dashboard = () => {
  // Sample data for today's available tests and recent attempted tests
  const todayTests = ['Test 1', 'Test 2', 'Test 3'];
  const recentTests = ['Test 4', 'Test 5', 'Test 6'];

  return (
    <div>
      <h2>Dashboard Page</h2>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {/* Container for today's available tests */}
        <div style={{ flex: 1, backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <h3>Today's Available Tests</h3>
          <ul>
            {todayTests.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
        </div>

        {/* Container for recent attempted tests */}
        <div style={{ flex: 1, backgroundColor: '#e0e0e0', padding: '20px', borderRadius: '8px' }}>
          <h3>Recent Attempted Tests</h3>
          <ul>
            {recentTests.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
