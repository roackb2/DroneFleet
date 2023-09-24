import Image from 'next/image'
import Link from 'next/link'

function NavBarIcon () {
  return (
    <div className='flex flex-row basis-40 justify-center'>
      <Link href="/">
        <Image
          src="/drone-fleet.png"
          alt="DroneFleet logo"
          width={60}
          height={60}
        />
      </Link>
    </div>
  )
}

type NavBarLink = {
  href: string
  name: string
}

function NavBarLinks () {
  const links: NavBarLink[] = [{
    href: '/deprecated/dashboard/live',
    name: 'Live'
  }, {
    href: '/deprecated/dashboard/drones',
    name: 'Drones'
  }, {
    href: '/deprecated/dashboard/mission-plan',
    name: 'Mission Plan'
  }]
  return (
    <div className="flex flex-row flex-1 justify-center">
      {links.map((link, index) => (
        <Link className='link m-2' key={index} href={link.href}>
          {link.name}
        </Link>
      ))}
    </div>
  )
}

function NavBarUser () {
  return (
    <div className="flex flex-row basis-40 justify-center">User</div>
  )
}

export default function DashboardNavBar() {
  return (
    <nav className="flex flex-row basis-20 items-center w-full shadow-2">
      <NavBarIcon />
      <NavBarLinks />
      <NavBarUser />
    </nav>
  )
}
