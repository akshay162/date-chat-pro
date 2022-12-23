const TheirMessage = ({message }) => {
    return (
        <div 
            className="message" 
            style={{ 
                float: 'left', 
                backgroundColor: '#CABCDC', 
                marginLeft: '4px',
                maxWidth: '3500px',
                marginTop: '5px'
            }}>
              {message}
        </div>
    );
  };
  
  export default TheirMessage;