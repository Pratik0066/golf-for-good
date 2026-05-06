import { Toaster } from 'react-hot-toast';

/**
 * Add this to your App.jsx to enable global professional notifications
 * Replace window.alert() calls with toast.success() or toast.error()
 */
export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#161B22',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '16px',
          fontWeight: '900',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        },
        success: {
          iconTheme: { primary: '#84cc16', secondary: '#000' },
        },
      }}
    />
  );
}