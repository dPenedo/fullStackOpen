
const NotificationMessage = ({ notification, errorMessage }) => {
    return (
        <div>
            {notification === null && errorMessage === null ? (
                <div>
                </div>
            ) : errorMessage === null ? (
                <div style={{ color: 'green', backgroundColor: '#eaeada', border: '2px solid green', padding: 8 }}>
                    {notification}
                </div>
            ) : (
                <div style={{ color: 'red', backgroundColor: '#eadaea', border: '2px solid red', padding: 8 }}>
                    {errorMessage}
                </div>
            )}
        </div>
    )
}

export default NotificationMessage
