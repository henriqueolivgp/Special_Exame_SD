import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/AuthHook"
import { ShieldMinus, Power } from 'lucide-react'

export function AsideBar() {

  const { logout } = useAuth()

  return (
    <>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="default-sidebar" className="fixed top-0  left-0 z-40 w-64 h-screen  transition-transform -translate-x-full  sm:translate-x-0 " aria-label="Sidebar">
        <div className="h-full overflow-y-auto bg-slate-700 dark:bg-gray-800 space-y-1">
          <div className="flex items-center w-full px-3 py-4">
            <img src="/logo192.png" alt="" className="w-8 h-8" />
            <span className="ms-3 text-xl font-bold">Dashboard</span>
          </div>
          <div className="h-px bg-slate-200 w-full"></div>
          <div className="flex flex-col min-h-[92%] justify-between">
            <ul className=" flex flex-col space-y-1 px-3 py-4 gap-2 font-medium">
              <li>
                <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z" clipRule="evenodd" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap text-white">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap text-white">Register</span>
                </Link>
              </li>
              <li>
                <Link to={'/login'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap text-white">Login</span>
                </Link>
              </li>
              <li>
                <Link to={'/admin-panel'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
                  <ShieldMinus className="text-gray-400" />
                  <span className="flex-1 ms-3 whitespace-nowrap text-white">Admin Panel</span>
                </Link>
              </li>
            </ul>
            <div className="px-3 py-4">
              <Link to={'/login'} onClick={logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
                <Power className="text-gray-400" />
                <span className="flex-1 ms-3 whitespace-nowrap text-white">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}