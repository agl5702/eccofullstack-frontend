import React from "react";
import ReactDOM from "react-dom/client";
import {AppRouter} from "./Router.jsx";
import {Provider} from "./components/ui/provider.jsx"
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <AppRouter>
          <App/>
      </AppRouter>
    </Provider>
  </React.StrictMode>
);
