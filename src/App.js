import "./App.scss"
import ChatPanel from "./components/ChatPanel"

function App() {
  return (
    <div className="App">
      <main className="Main">
        <div className="ChatContainer">
          <ChatPanel />
        </div>
      </main>
    </div>
  )
}

export default App
