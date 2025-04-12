import './App.css';
import Header from './header';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [wDetails, setWdetails] = useState();

  const getData = (event) => {
    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then(res => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWdetails(undefined);
        } else {
          setWdetails(finalRes);
        }
      });

    setCity('');
  };

  return (
    <div className='w-full min-h-screen bg-[#4aacb1] flex justify-center items-center'>
      <div className='max-w-[600px] w-full bg-white p-8 rounded shadow-lg'>
        <h1 className='text-[32px] font-bold text-center text-[#4aacb1] mb-6'>
         Weather App
        </h1>

        <form onSubmit={getData} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '30px'
        }}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City name"
            style={{
              width: '100%',
              maxWidth: '300px',
              height: '45px',
              padding: '0 15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'box-shadow 0.3s, border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(74, 172, 177, 0.3)'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '12px 25px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Search
          </button>
        </form>


        <div id="det" className='w-full text-center'>
          {wDetails ? (
            <>
              <h3 className='font-bold text-[24px]'>
                {wDetails.name}{' '}
                <span className='bg-yellow-300 px-2 py-1 rounded'>
                  {wDetails.sys.country}
                </span>
              </h3>
              <h2 className='font-bold text-[36px] mt-2'>
                {wDetails.main?.temp}°C
              </h2>
              <img
                src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
                alt='Weather icon'
                className='mx-auto'
              />
              <p className='text-gray-600 mt-2 capitalize'>
                {wDetails.weather[0].description}
              </p>
            </>
          ) : (
            <p className='text-white font-semibold'>No City Found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
