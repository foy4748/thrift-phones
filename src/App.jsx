import "./App.css";
import "react-photo-view/dist/react-photo-view.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
