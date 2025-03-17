import { Route } from "wouter";
import Home from "@pages/Home.tsx";
import Background from "@components/shared-ui/Background/Background.tsx";

const App = () => {
  return (
    <>
        <Background />

        <Route path="/" component={() => <Home />} />
    </>
  )
}

export default App
