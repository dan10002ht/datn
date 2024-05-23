import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
