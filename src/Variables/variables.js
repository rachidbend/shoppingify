export const routeVariants = {
  initial: {
    opacity: 0,
    y: '20vh',
  },
  final: {
    opacity: 1,
    y: '0vh',
    transition: {
      type: 'spring',
      mass: 0.2,
      duration: 0.6,
      delay: 0.2,
    },
  },
};

export const childrenVariants = {
  initial: {
    opacity: 0,
    y: '30px',
  },
  final: {
    opacity: 1,
    y: '0px',
    transition: {
      duration: 0.6,
      delay: 0.4,
    },
  },
};

export const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZ2hzdWt4ZnpueGxtaGVuYmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MzU2NTgsImV4cCI6MjAyMDQxMTY1OH0.ez2ULk1Z1bACj7JYvDJpDjesFAtmUBmn8EQva65MhG8';
export const API_URL = 'https://noghsukxfznxlmhenbko.supabase.co';
