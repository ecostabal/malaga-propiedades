import { RoutePaths } from '../general/RoutePaths';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <h3>
        Page not found.
      </h3>
      <button onClick={() => navigate(RoutePaths.HOME)} type="button">
        Go Home Now
      </button>
    </div>
  );
};