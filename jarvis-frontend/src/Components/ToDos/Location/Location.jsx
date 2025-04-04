import React, { useState } from 'react';
import LocationCard from './LocationCard';
import { v4 as uuidv4 } from 'uuid';

const Location = () => {
    const [locations, setLocations] = useState([]);
    const [LocationName, setLocationName] = useState("Location Name")

    const DeleteLocation = (id) => {
        console.log(" Location to delete", id)
        const updatedLocations = locations.filter(location => location.id !== id);
        setLocations(updatedLocations)
    }
    const addLocation = (event) => {
        const uniqueId = uuidv4(); // Generate a unique ID using the uuid library
        const newLocation = { id: uniqueId, LocationName: "Location Name" }; // You can replace "Location Name" with dynamic data if required
        setLocations([...locations, newLocation]);
        console.log("Location added", newLocation);
    };

    const change = (id, value) => {
        // Update the LocationName for the specific location based on its ID
        const updatedLocations = locations.map((location) => {
            if (location.id === id ) {
               return  { ...location, LocationName: value }

            }
            return location

        }
        );
        setLocations(updatedLocations); // Update the state with the new locations array
    };

    return (
        <div className='Location-Card-Holder flex-col border gap-3'>
            <div className='border flex justify-center py-9'>
                <button className='border py-5 px-40 rounded-2xl' onClick={addLocation} type='button'>
                    Add Location
                </button>
            </div>



            {locations.map((e) => (
                <>
                    <div className='flex justify-between  px-7'>
                        <div className=' w-[90%]'>
                            <h1>{e.id}</h1>
                            <input placeholder='Enter Location' type="text" value={e.LocationName} onChange={(event) => change(e.id, event.target.value)} />
                            <LocationCard key={e.id} location={e} />
                        </div>
                        <button type='button' onClick={() => DeleteLocation(e.id)}  >Delete</button>

                    </div>

                </>

            ))}
        </div>
    );
};

export default Location;
