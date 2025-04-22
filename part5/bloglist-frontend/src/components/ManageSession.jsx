const manageSession = (user, handleLogout) => {
    return (
        <div>
            <p>
                Username: <b>{user.username}</b>
            </p>
            <button onClick={handleLogout} type="button">Logout</button>
        </div>
    );
};
export default manageSession
