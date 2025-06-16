import { useEffect, useRef, useState, type FormEvent } from "react";
import { api } from "../../services/api";
import { useNavigate, useParams } from 'react-router-dom';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export default function Edit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [, setLoading] = useState(true);
    const [, setCustomer] = useState<CustomerProps | null>(null);
    const nameUpdRef = useRef<HTMLInputElement | null>(null);
    const emailUpdRef = useRef<HTMLInputElement | null>(null);
    const [, setError] = useState<string | null>(null);

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
                    id: customerId
                }
            });

            setCustomer(response.data);

            if (nameUpdRef.current) {
                nameUpdRef.current.value = response.data.name;
            }
            if (emailUpdRef.current) {
                emailUpdRef.current.value = response.data.email;
            }

        } catch(err) {
            setError('Error while loading customer');
            console.log(err)
        } finally {
            setLoading(false);
        }
    }
    
    async function editCustomer(event: FormEvent) {
        event.preventDefault();
        if (!nameUpdRef.current?.value || !emailUpdRef.current?.value) { 
            alert("Please, fill in all the fields!")
            return 
        };

        const requestData = {
            name: nameUpdRef.current?.value,
            email: emailUpdRef.current?.value,
        };

        try {
            await api.patch(`/customer?id=${id}`, requestData);
            alert("Customer updated successfully!")
            navigate(`/customer/${id}`)

        } catch (err) {
            alert(err);
        };
    }

    return ( 

        <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
            <main className="my-10 w-full md:max-w-2xl">
                <h1 className="text-4xl font-medium text-white">Customers</h1>
                <form className="flex flex-col my-6" onSubmit={editCustomer}>
                    <label className="font-medium text-white">Name:</label>
                    <input type="text" className="w-full mb-5 p-2 rounded bg-white"
                    ref={nameUpdRef}
                    />

                    <label className="font-medium text-white">E-mail:</label>
                    <input type="text" className="w-full mb-5 p-2 rounded bg-white"
                    ref={emailUpdRef}
                    />

                    <input 
                    type="submit" 
                    value="Update" 
                    className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
                    />
                </form>
                <button className="w-full cursor-pointer p-2 bg-blue-400 rounded font-medium mt-0.5"
                onClick={() => navigate('/')}>Return to Home</button>
            </main>
        </div> 
    )
}