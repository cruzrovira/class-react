import CustomForm from "./components/customForm/customForm"

function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-black to-sky-800">
      <div className="max-w-96 rounded bg-gray-50 p-4 shadow">
        <h1 className="text-2xl">Datos de usuario</h1>
        <p>Agregue los datos necesarios para poder inscribirse </p>
        <CustomForm />
      </div>
    </div>
  )
}

export default App
