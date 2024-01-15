import { Navigate, Route, Routes, useLocation } from 'react-router';
import AppLayout from './AppLayout';
import Items from '../pages/Items';
import Statistics from '../pages/Statistics';
import History from '../pages/History';
import PageNotFound from './PageNotFound';

/*
doing the animation using the location causes everything to unmount and render for the fisrt time instead of being rerendered, it messes with how react works. so don't use it like this.
but the animation for the routes still works, because it happens when they first render, which is when ever a route changes, but doesn't cause all components to unmout and render for the first time 
*/

export default function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route element={<AppLayout />}>
        <Route index path="/" element={<Navigate to={'/items'} />} />
        <Route path="/items" element={<Items />} />
        <Route path="/history" element={<History />} />
        <Route path="/statistics" element={<Statistics />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
