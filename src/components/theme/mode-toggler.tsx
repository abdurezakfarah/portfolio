'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/shadcn/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    if (theme && theme === 'dark') {
      setTheme('light');
      return;
    }
    setTheme('dark');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
    >
      <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
