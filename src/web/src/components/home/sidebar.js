import { Outlet } from 'react-router-dom'

export function Sidebar() {

  return (
    <div className="flex-1">
      <div className="content-box p-4 w-auto">
        <Outlet />
      </div>
    </div>
  )
}