import { Navigate, Route, Routes, useLocation } from 'react-router';
import AppLayout from './AppLayout';
import Items from '../pages/Items';
import Statistics from '../pages/Statistics';
import History from '../pages/History';

export default function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route element={<AppLayout />}>
        <Route index path="/" element={<Navigate to={'/items'} />} />
        <Route path="/items" element={<Items />} />
        <Route path="/history" element={<History />} />
        <Route path="/statistics" element={<Statistics />} />
      </Route>
    </Routes>
  );
}
