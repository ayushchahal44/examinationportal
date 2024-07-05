import React from 'react';

const Dashboard = () => {
  // Sample data for today's available tests and recent attempted tests
  const todayTests = ['19073 mensuration calendars clocks', '19073 Revision 123', '19073 P and C Probability', '19073 Complete revision pea 306'];
  const recentTests = ['K22AZmthCA3', 'PRACTICE FINAL', 'PRACTICE SESSION', 'K22BZ TEST2', 'CA 1 PEL125 K'];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '77vw', height: '90vh', padding: '10px' }}>
      {/* Container for today's available tests */}
      <div style={{ backgroundColor: '#00af91', padding: '20px', borderRadius: '8px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: 'white', textAlign: 'center', borderBottom: '1px solid white', paddingBottom: '10px' }}>Today's Tests</h3>
        <ul style={{ flex: 1, margin: 0, padding: 0, color: 'white' }}>
          {todayTests.map((test, index) => (
            <li key={index} style={{ listStyleType: 'none', margin: '8px 0', textAlign: 'center' }}>{test}</li>
          ))}
        </ul>
      </div>

      {/* Container for recent attempted tests */}
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: 'black', textAlign: 'center', borderBottom: '1px solid black', paddingBottom: '10px' }}>Recently Attempted Tests</h3>
        <ul style={{ flex: 1, margin: 0, padding: 0, color: 'black' }}>
          {recentTests.map((test, index) => (
            <li key={index} style={{ listStyleType: 'none', margin: '8px 0', textAlign: 'center' }}>{test}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
