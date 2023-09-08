import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { authContext } from '../../Context/Authprovider';
import toast from 'react-hot-toast';

export const Addteam = () => {
    const { register, handleSubmit, reset, require, watch, formState: { errors } } = useForm();
    const [members, setMembers] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { user } = useContext(authContext)

    console.log(members)

    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMembers(data)

            })
            .catch(e => console.error(e))
    }, [])





    const handleTeam = (data) => {


        const addTeamData = {
            team_name: data.team_name,
            peoples: selectedOptions,
            admin: user.email
        }

        console.log(addTeamData)

        fetch("http://localhost:5000/teams", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(addTeamData)
        })
            .then((res) => res.json())
            .then((data) => {

                console.log(data)
                toast.success("successfully add task")
                reset();
            })
            .catch((e) => console.log(e))

    }





    const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };



    return (
        <div className=' w-11/12 md:w-2/3 bg-gray-50 mt-6 shadow-xl my-5 px-10 py-5 mx-auto'>
            <h1 className='text-xl font-bold mb-3 text-center'>Add a team collaboration</h1>

            <form onSubmit={handleSubmit(handleTeam)} action="">
                <div className='flex flex-col'>
                    <label className='font-semibold '>Add a team name</label>
                    <input
                        placeholder='Team name'
                        className='w-full mt-1 border-slate-600 p-2 border rounded'
                        type="text" name="team_name"
                        {...register("team_name", require)} />

                </div>

                <div className="mt-4">
                    <h3 className=" font-semibold">Invite people for your team</h3>
                    <div className="border flex gap-2 w-full px-3 py-5 mt-1 border-gray-600 rounded-md">
                        {selectedOptions.map((user) => (
                            <p className='bg-blue-500 text-white font-bold rounded-lg py-1 px-2'>{user}</p>
                        ))}
                    </div>
                </div>


                <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 rounded p-2">
                    {members.map((option) => (
                        <label key={option} className="">
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option.username)}
                                onChange={() => toggleOption(option.username)}
                                className="mr-2"
                            />
                            {option.username}
                        </label>
                    ))}
                </div>



                <input type="submit" value="Invite People" className=' text-white font-bold px-4 py-2 text-center w-full mt-5 bg-blue-700 rounded-lg  hover:bg-blue-900 duration-500' />

            </form>
        </div>
    )
}
