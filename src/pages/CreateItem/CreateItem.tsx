import { useState, useRef, type FormEvent } from 'react';
import { api } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function CreateItem() {
    const [, setRegCustomers] = useState<CustomerProps[]>([]);
    const nameRegRef = useRef<HTMLInputElement | null>(null);
    const emailRegRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/")
    };

    async function handleSubmit(event: FormEvent) {
      event.preventDefault();
    
      if (!nameRegRef.current?.value || !emailRegRef.current?.value) {
        alert("Fill in all the fields, please!")
        return
      };

      try {
        const response = await api.post("/customer", {
        name: nameRegRef.current?.value,
        email: emailRegRef.current?.value
        })

        console.log(response.data.message)
        
        setRegCustomers(allCostumers => [...allCostumers, response.data])
        
        alert(`${nameRegRef.current.value} was added successfully!`)

        nameRegRef.current.value = "";
        emailRegRef.current.value = "";
        goHome();

      } catch(error: unknown) {

        let errorMessage = "Unknown error";
        // To avoid errors about ANY/UNKNOWN type
        if (error instanceof AxiosError) {
          if (error.response) {
          errorMessage = error.response.data?.message ||
                         error.response.data?.error ||
                         error.response.data ||
                         `Erro ${error.response.status}`

          } else if (error.request) {
              errorMessage = "Connection error"

          } else {
              errorMessage = error.message || "Unknown error"
          }
        }

        alert(errorMessage)
      }
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
            <main className="my-10 w-full md:max-w-2xl">
            <h1 className="text-4xl font-medium text-white">Customers</h1>

            <form className="flex flex-col my-6" onSubmit={handleSubmit}>
            <label className="font-medium text-white">Name:</label>
            <input type="text" placeholder="Type your full name..." className="w-full mb-5 p-2 rounded bg-white"
            ref={nameRegRef}
            />

            <label className="font-medium text-white">E-mail:</label>
            <input type="text" placeholder="Type your e-mail..." className="w-full mb-5 p-2 rounded bg-white"
            ref={emailRegRef}
            />

            <input 
            type="submit" 
            value="Register" 
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            />
            </form>
            <button className="cursor-pointer w-full p-2 bg-blue-400 rounded font-medium -mt-2"
            onClick={goHome}
            >
              Back to Home
            </button>
            </main>
        </div>
    )
}