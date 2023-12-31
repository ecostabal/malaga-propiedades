import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';
import { RoutePaths } from '../general/RoutePaths';
import { FavoriteContext } from '../FavoriteContext';

const navigation = [
  { name: 'Inicio', path: RoutePaths.HOME },
  { name: 'Propiedades', path: RoutePaths.PROPIEDADES },
  { name: 'Conversemos', path: RoutePaths.CONVERSEMOS },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const { favoriteCount } = useContext(FavoriteContext);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  return (
    <Disclosure as="nav" className="white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink to={RoutePaths.HOME} className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src="/assets/logo.png" alt="Málaga Propiedades" />
                </NavLink>
                
                <div className="hidden sm:ml-6 sm:block">
                  <div className="ml-12 flex space-x-6">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={classNames(
                          activeTab === item.path ? 'bg-slate-50 text-gray-900' : 'text-gray-900 hover:bg-slate-50 hover:text-gray-900',
                          'rounded-md px-5 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className="relative rounded-full p-1 text-gray-400 hover:text-neutral-600">
                  <span className='absolute top-0 right-0 text-white bg-red-600 w-4 h-4 flex items-center justify-center text-xs rounded-full'>{favoriteCount}</span>
                  <span className="sr-only">View notifications</span>
                  <HeartIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="relative rounded-full p-1 text-gray-400 hover:text-neutral-600">
                    <span className="sr-only">Open user menu</span>
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                  </Menu.Button>
                  
                  <Transition as={React.Fragment} 
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to={RoutePaths.LOGIN} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            Login / Register
                          </NavLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="bg-gray-100 space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.path}
                  className={classNames(
                    activeTab === item.path ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-white hover:text-gray-900',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
