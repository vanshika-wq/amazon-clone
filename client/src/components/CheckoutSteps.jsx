export default function CheckoutSteps({ step1, step2, step3 }) {
  const steps = [
    { label: 'Sign In', active: step1 },
    { label: 'Shipping', active: step2 },
    { label: 'Place Order', active: step3 },
  ];
  return (
    <div className="flex justify-center gap-2 mb-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <span className={`px-4 py-1.5 rounded text-sm font-medium ${step.active ? 'bg-amazon-yellow text-black' : 'bg-gray-200 text-gray-500'}`}>
            {step.label}
          </span>
          {i < steps.length - 1 && <span className="mx-2 text-gray-400">›</span>}
        </div>
      ))}
    </div>
  );
}
