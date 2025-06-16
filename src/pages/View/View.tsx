import { useEffect, useState } from 'react';
import { FiTrash, FiEdit } from 'react-icons/fi';
import { api } from "../../services/api";
import { useNavigate, useParams } from 'react-router-dom';
import { dateUtils } from '../../utils/dateUtils';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export default function View() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState<CustomerProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, setDeleting] = useState(false)

    useEffect(() => {
        if (id) {
            loadCustomer(id)
        }
    }, [id])

    async function loadCustomer(customerId: string) {
        try {
            setLoading(true);
            const response = await api.get("/customer", {
            params: {
                id: customerId,
            }
        });
        
        setCustomer(response.data);

        } catch(err) {
            setError('Error while loading customer');
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
                <main className="my-10 w-full md:max-w-2xl text-center">
                    <h1 className="flex justify-center text-4xl font-medium text-white">Loading...</h1>
                </main>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center px-4">
            <main className="my-10 w-full md:max-w-2xl text-center">
                <h1 className="flex justify-center text-4xl font-medium text-white">{error}</h1>
                <button className="cursor-pointer p-2 bg-blue-400 rounded font-medium mt-5"
                onClick={() => navigate('/')}>Return to Home</button>
            </main>
            </div>
        )
    }

    if (!customer) {
        return (
            <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center px-4">
            <main className="my-10 w-full md:max-w-2xl text-center">
                <h1 className="flex justify-center text-4xl font-medium text-white">{error}</h1>
                <button className="cursor-pointer p-2 bg-blue-400 rounded font-medium mt-5"
                onClick={() => navigate('/')}>Return to Home</button>
            </main>
            </div>
        )
    }

    async function handleEdit(customerId: string) {
        try {
        await api.get("/customer", {
          params: {
            id: customerId,
          }
        })
        navigate(`/edit/customer/${customerId}`);

      } catch(err) {
        console.log(err)
      }
    }

    async function handleDelete(customerId: string) {
        if (!confirm('Are you sure you want to delete?')) {
            return;
        }

        try {
            setDeleting(true);

            await api.delete("/customer", {
            params: {
                id: customerId,
            }
        });

        alert("Deleted successfully!");
        navigate("/");
        
        } catch(err) { 
            console.log(err) 
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
        <main className="my-10 w-full md:max-w-2xl">
            <h1 className="text-4xl font-medium text-white">Costumer Details</h1>
            <section className="mt-9 flex flex-col gap-4">
            <article key={customer.id} className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
                    <p><span className="font-medium">Name: </span>{customer.name}</p>
                    <p><span className="font-medium">E-mail: </span>{customer.email}</p>
                    <p><span className="font-medium">Status: </span>{customer.status ? "Active" : "Inactive"}</p>
                    <p><span className="font-medium">Creation Date: </span>{dateUtils.format(customer.created_at)}</p>
                    <p><span className="font-medium">Last Update: </span>{dateUtils.format(customer.updated_at)}</p>
                        
                    <button className="bg-blue-800 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2 cursor-pointer"
                    onClick={() => handleEdit(customer.id)}
                    >
                    <FiEdit size={18} color="#FFF" />
                    </button>

                    <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 top-6 cursor-pointer"
                    onClick={() => handleDelete(customer.id)}
                    >
                    <FiTrash size={18} color="#FFF" />
                    </button>
                </article>
            </section>
            <button className="cursor-pointer w-full p-2 bg-blue-400 rounded font-medium mt-5" 
            onClick={() => navigate("/")}
            >
              Back to Home
            </button>
        </main>
    </div>
    )
}