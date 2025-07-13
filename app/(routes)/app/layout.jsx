// app/(routes)/app/layout.jsx
"use client";
import { AppStateProvider } from '../../components/app/AppStateContext';

export default function AppLayout({ children }) {
  return (
    <AppStateProvider>
      {children}
    </AppStateProvider>
  );
}