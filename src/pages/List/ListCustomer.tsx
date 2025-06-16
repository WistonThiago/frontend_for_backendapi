import { useEffect, useState } from 'react';
import { api } from "../../services/api";
import { FiTrash, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export default function ListCustomer() {
    const [listCustomers, setListCustomers] = useState<CustomerProps[]>([]);

    useEffect(() => {
      loadAllCustomers();
    }, [])

    async function loadAllCustomers() {
        const response = await api.get("/customers")
        setListCustomers(response.data);
    }

    async function handleDelete(id: string) {
      try {
        if (!confirm("Are you sure you want to delete?")) {
          return
        }
        
        await api.delete("/customer", {
          params: {
            id: id,
          }
        })

        const allCustomers = listCustomers.filter((customer) => customer.id !== id)
        setListCustomers(allCustomers);
        
        alert("Deleted Successfully!")
        
       } catch(err) { 
        console.log(err) 
      }
    }

    async function handleView(id: string) {
      try {
        await api.get("/customers", {
          params: {
            id: id,
          }
        })
        navigate(`/customer/${id}`)

      } catch(err) {
        console.log(err)
      }
    }

    const navigate = useNavigate();
    const goRegister = () => {
        navigate("/register")
    };

    return (
     <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
        <main className="my-10 w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white">Customers</h1>
          <section className="mt-9 flex flex-col gap-4">
          { listCustomers.map((customer) => (
            <article key={customer.id} className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
                <p><span className="font-medium">Name: </span>{customer.name}</p>
                <p><span className="font-medium">E-mail: </span>{customer.email}</p>
                <p><span className="font-medium">Status: </span>{customer.status ? "Active" : "Inactive"}</p>
          
                <button className="bg-blue-800 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2 cursor-pointer"
                onClick={() => handleView(customer.id)}
                >
                <FiEye size={18} color="#FFF" />
                </button>
                
                <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 top-6 cursor-pointer"
                onClick={() => handleDelete(customer.id)}
                >
                <FiTrash size={18} color="#FFF" />
                </button>
            </article>
            ))}
            <button className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            onClick={goRegister}>
              REGISTER A NEW CUSTOMER
            </button>
            </section>
        </main>
     </div>
    )
}