interface NavItem {
  title: string
  href: string
  description: string
}

const routes: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    description: '',
  },
  {
    title: 'Iceland',
    href: '/iceland',
    description: '',
  },
  {
    title: 'Models',
    href: '/models',
    description: '',
  },
  {
    title: 'Spain',
    href: '/spain',
    description: '',
  },
  {
    title: 'Bland',
    href: '/bland',
    description: '',
  },
]

// const routes = {
//   home: '/',
//   iceland: '/iceland',
//   models: '/models',
//   spain: '/spain',
// } as const;

// type TypeOfRoutes = typeof routes;
// type RouteKeys = keyof typeof routes;

// export type Route = TypeOfRoutes[RouteKeys];

export default routes
