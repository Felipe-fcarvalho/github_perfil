import { useState } from 'react'

import Perfil from "./components/Perfil";
import ReposList from "./components/ReposList";
import './App.css'

function App() {
  const [nomeUsuario, setNomeUsuario] = useState('');

  return (
    <>

      <label htmlFor="profile-name">Procurar perfil Github: </label>
      <input type="text" onBlur={(e) => setNomeUsuario(e.target.value)} id='profile-name' />


      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario} />
        </>
      )}
    </>
  )
}

export default App
