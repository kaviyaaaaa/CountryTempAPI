import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Article({
  flags,
  name,
  population,
  region,
  subregion,
}) {

  const [temp, setTemp] = useState(null);
  const [popUp, setPopUp] = useState(false)

  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate(`/${name.common}`)
  }

  async function getTemp() {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${name.common}`

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '9b4c7023eemsh2cbe8ee39604836p1a8070jsn5b9046b37c26',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const result = await(await fetch(url, options)).json();
      setTemp(result.current.temp_c)
      setPopUp(prevPopUp => !prevPopUp)

    } catch (error) {
      console.error(error);
    }
  }

  return (
        <article onClick={getTemp} className="bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg shadow overflow-hidden relative">
          <img src={flags.svg} alt="" className="md:h-72 w-full object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              {name.common}
            </h2> 
            <ul className="flex flex-col items-start justify-start gap-2 dark:text-gray-400">
              <li>Population: {population.toLocaleString()}</li>
              <li>Region: {region}</li>
              <li>Subregion: {subregion}</li>
            </ul>
          </div>

          { popUp ? (
            <div className="p-4 flex-col text-center absolute inset-0 text-white text-xl flex items-center justify-center bg-black/70" >
                <p>Temperature at {name.common}: {temp}°C</p>
                <br />
                <p className="text-sm text-white  hover:text-purple-400 underline" onClick={handleDoubleClick}>Click here to Know more!</p>
            </div>
          ) : null}
        </article>
  );
}
