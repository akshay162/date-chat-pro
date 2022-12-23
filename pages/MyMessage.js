const MyMessage = ({ message }) => {
    return (
      <div 
        className="message" 
        style={{ 
            float: 'right',
            marginRight: '4px', 
            color: 'white', 
            backgroundColor: '#3B2A50',
            maxWidth: '3500px',
            marginTop: '5px'
        }}>
        {message}
      </div>
    );
  };
  
  export default MyMessage;