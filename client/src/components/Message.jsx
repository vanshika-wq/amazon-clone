export default function Message({ type = 'info', children }) {
  const styles = {
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };
  return (
    <div className={`border rounded px-4 py-3 text-sm ${styles[type]}`}>
      {children}
    </div>
  );
}
