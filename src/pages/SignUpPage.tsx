
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=New+User&background=random&length=2";

const SignUpPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<string>(DEFAULT_AVATAR);

  // handle avatar file input
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target && typeof ev.target.result === "string") {
        setAvatar(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Placeholder demo handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Sign up logic not yet connected");
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 dark:from-[#22263c] dark:via-[#33314e] dark:to-[#10313f] transition-colors duration-500 p-4">
      <div className="mx-auto max-w-md w-full flex flex-col items-center bg-white dark:bg-background rounded-lg shadow-md p-8">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-4 w-full">
          <div className="relative mb-2">
            <img
              src={avatar}
              alt="Avatar Preview"
              className="h-20 w-20 rounded-full object-cover border-2 border-primary bg-muted"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
              }}
            />
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 border border-muted-foreground bg-background/80"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload photo"
            >
              <UserPlus size={18} />
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
          <p className="text-xs text-muted-foreground mb-0">Upload your photo (optional)</p>
        </div>
        <UserPlus className="mb-2 text-primary" size={36} />
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required autoComplete="email" />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required autoComplete="new-password" />
          </div>
          <div className="mb-6">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" required autoComplete="new-password" />
          </div>
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button type="button" variant="link" className="p-0 h-auto" onClick={() => navigate('/signin')}>
            Sign in
          </Button>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
