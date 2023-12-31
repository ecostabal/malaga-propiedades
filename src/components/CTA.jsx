import { NavLink } from "react-router-dom";
import { RoutePaths } from '../general/RoutePaths';


export default function CTA() {
    return (
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="leading-snug text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Vendemos tu propiedad en tiempo récord.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Utilizamos las mejores estrategias para lograr que tu propiedad llegue a buenas manos en un plazo de tiempo coherente.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <NavLink to={RoutePaths.CONVERSEMOS}>
                <div className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100">
                    Conversémos
                </div>
              </NavLink>
              <NavLink to={RoutePaths.PROPIEDADES}>
                <div className="text-sm font-semibold leading-6 text-white">
                    Ver Propiedades <span aria-hidden="true">→</span>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    )
  }
  