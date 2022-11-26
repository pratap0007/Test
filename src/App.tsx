import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <form method="POST" action="SCRIPT_HOSTED_URL">
      <div>
        <input name="UserName" type="text" placeholder="UserName" required />
      </div>
      <div>
        <input name="MobNumber" type="text" placeholder="MobNumber" required />
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default App;
