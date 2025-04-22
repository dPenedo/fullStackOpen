import blogService from "../services/blogs";
import loginService from "../services/login";

export const handleLogin = async ({ event, username, password, setUser, setUsername, setPassword, setErrorMessage }) => {
    event.preventDefault();
    try {
        const user = await loginService.login({
            username,
            password,
        });
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
        blogService.setToken(user.token);
        setUser(user);
        setUsername("");
        setPassword("");
    } catch (exception) {
        setErrorMessage("Wrong credential");
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }
};
export const handleLogout = async ({ setUser, setUsername, setPassword, setErrorMessage }) => {
    try {
        window.localStorage.removeItem("loggedBlogAppUser")
        setUser(null)
        setUsername("");
        setPassword("");
        console.log("Logout")
    } catch (exception) {
        setErrorMessage("Error on Logout");
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }
};

