import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p>We’ve received your message and will contact you shortly.</p>
      </div>
    </div>
  );
}
