import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store";
import App from "./App";
import "./assets/css/Styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/*" element={<App/>}></Route>
            </Routes>
        </Router>
    </Provider>
);