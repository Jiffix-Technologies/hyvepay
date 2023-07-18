import { useState } from "react";

import "./assets/css/input.css";
import "./App.css";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { persistStore } from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";
let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
