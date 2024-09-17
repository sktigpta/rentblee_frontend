import './App.css'
import { BrowserRouter } from "react-router-dom"
import { PageRoutes } from './components/PageRoutes'
import Navbar from './components/navbar/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <PageRoutes />
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
