import Layout from "./scenes/Layout";
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom"
import BodySelection from "./scenes/BodySelection";
import Others from "./scenes/Others";
import Result from "./scenes/Result";
import { useState, useEffect } from 'react';
import General from "./scenes/General";
import Login from "./scenes/Login";
import SignUp from "./scenes/SignUp";
import Agreement from "./scenes/Agreement";
import * as tf from '@tensorflow/tfjs';
import { useSelector } from "react-redux";
import History from "./scenes/History";
import Dashboard from "./scenes/Dashboard";
import Profile from "./scenes/Profile"
import Landing from "./scenes/Landing";

function App() {
  const user = useSelector((state) => state.global.user)

  const [model, setModel] = useState(null);
  const [body, setBody] = useState("NOT SELECTED")
  const [selSymptoms, setSelSymptoms] = useState([])
  useEffect(() => {
    async function loadModel() {
      
      const loadedModel = await tf.loadLayersModel('model/model.json');
     
      setModel(loadedModel);
    }
    loadModel();
  }, []);


  const Authenticator = ({ component }) => {
    
    return (
      user ? component : <Login />
    )
  }



  return (
    <div className="App">
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/predict" element={<Authenticator component={<Layout setSelSymptoms={setSelSymptoms} />} />} >
              <Route path="/predict/body" element={<BodySelection body={body} setBody={setBody} selSymptoms={selSymptoms} setSelSymptoms={setSelSymptoms} />} />
              <Route path="/predict/other" element={<Others body={body} setBody={setBody} selSymptoms={selSymptoms} setSelSymptoms={setSelSymptoms} />} />
              <Route path="/predict/result" element={<Result  selSymptoms={selSymptoms}  model={model}  setSelSymptoms={setSelSymptoms} />} />
              <Route path="/predict/general" element={<General />} />
              <Route path="/predict/agreement" element={<Agreement />} />
              <Route path="/predict/history" element={<History />} />
              <Route path="/predict/dashboard" element={<Dashboard  setSelSymptoms={setSelSymptoms} />} />
              <Route path="/predict/profile" element={<Profile />} />
              
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;
