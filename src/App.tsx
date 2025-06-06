import { FiTrash } from 'react-icons/fi';

export default function App() {
  return (
    <div>
      <h1 className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
        <main className="my-10 w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white">Customers</h1>

          <form className="flex flex-col my-6">
            <label className="font-medium text-white">Name:</label>
            <input type="text" placeholder="Type your full name..." className="w-full mb-5 p-2 rounded bg-white"/>

            <label className="font-medium text-white">E-mail:</label>
            <input type="text" placeholder="Type your e-mail..." className="w-full mb-5 p-2 rounded bg-white"/>

            <input 
              type="submit" 
              value="Register" 
              className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
          </form>

          <section className="flex flex-col">
            <article className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
              <p><span className="font-medium">Name: </span>Wiston</p>
              <p><span className="font-medium">E-mail: </span>wiston@email.com</p>
              <p><span className="font-medium">Status: </span>Active</p>
              <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2">
                <FiTrash size={18} color="#FFF" />
              </button>
            </article>
          </section>

        </main>
      </h1>
    </div>
  )
}
