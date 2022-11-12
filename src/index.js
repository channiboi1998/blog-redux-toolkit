import "./assets/css/Styles.css";
import store from "./app/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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