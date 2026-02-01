
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "dim", label: "Dim", icon: Moon },
  { value: "dracula", label: "Dracula", icon: Moon },
  { value: "system", label: "System", icon: Sun }
];

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // For SSR/hydration safety
  if (!mounted) return null;
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  const currentOption =
    themes.find(opt => opt.value === theme) ||
    themes.find(opt => opt.value === "system");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Toggle theme"
        >
          {currentOption?.icon ? <currentOption.icon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 z-50 bg-popover">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {themes.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              <span className="flex items-center gap-2">
                <option.icon className="w-4 h-4" />
                {option.label}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
