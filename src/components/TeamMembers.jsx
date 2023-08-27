import React from 'react';

const people = [
    {
      name: 'Enrique Costabal Guzmán',
      role: 'Co-Founder / CEO',
      imageUrl:
        '../src/assets/EC.png',
    },
    {
      name: 'Nicolás Morales Alcalde',
      role: 'Co-Founder / COO',
      imageUrl:
        '../src/assets/NM.png',
    },
    {
      name: 'Katya Marincovich Schneider',
      role: 'Co-Founder / Customer Success Manager',
      imageUrl:
        '../src/assets/KM.png',
    },
    {
      name: 'Vicente Sánchez Amunátegui',
      role: 'Sales Representative',
      imageUrl:
        '../src/assets/VS.png',
    },
    
    // More people...
  ]
  
  export default function TeamMembers() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Un equipo sólido</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
              suspendisse.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-gray-800">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  