
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

const SignInPage = () => {
  const navigate = useNavigate();

  // Placeholder demo handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Sign in logic not yet connected");
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 dark:from-[#22263c] dark:via-[#33314e] dark:to-[#10313f] transition-colors duration-500 p-4">
      <div className="mx-auto max-w-md w-full flex flex-col items-center bg-white dark:bg-background rounded-lg shadow-md p-8">
        <LogIn className="mb-2 text-primary" size={36} />
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required autoFocus autoComplete="email" />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required autoComplete="current-password" />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button type="button" variant="link" className="p-0 h-auto" onClick={() => navigate('/signup')}>
            Sign up
          </Button>
        </p>
      </div>
    </main>
  );
};

export default SignInPage;
