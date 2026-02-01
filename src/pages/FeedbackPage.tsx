

import FeedbackForm from "@/components/FeedbackForm";

export default function FeedbackPage() {
  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 dark:from-[#22263c] dark:via-[#33314e] dark:to-[#10313f] transition-colors duration-500 flex items-center justify-center">
      <FeedbackForm />
    </div>
  );
}

