import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        code: ['"Source Code Pro"', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          light: 'hsl(var(--gradient-accent-from))',
          dark: 'hsl(var(--gradient-accent-to))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'glow': {
          '0%, 100%': { filter: 'brightness(1.2)', textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary))' },
          '50%': { filter: 'brightness(1.4)', textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))' },
        },
        'fall': {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
        'fall': 'fall linear infinite',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(to right, hsl(var(--border) / 0.1) 1px, transparent 1px),
                         linear-gradient(to bottom, hsl(var(--border) / 0.1) 1px, transparent 1px)`,
        'gradient-primary': 'linear-gradient(var(--gradient-angle), hsl(var(--gradient-primary-from)), hsl(var(--gradient-primary-to)))',
        'gradient-accent': 'linear-gradient(var(--gradient-angle), hsl(var(--gradient-accent-from)), hsl(var(--gradient-accent-to)))',
        'gradient-background': 'linear-gradient(var(--gradient-angle), hsl(var(--gradient-background-from)), hsl(var(--gradient-background-to)))',
        'gradient-card': 'linear-gradient(var(--gradient-angle), hsl(var(--gradient-card-from)), hsl(var(--gradient-card-to)))',
        'gradient-input': 'linear-gradient(var(--gradient-angle), hsl(var(--gradient-input-from)), hsl(var(--gradient-input-to)))',
      },
      backgroundSize: {
        'grid-pattern': '40px 40px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
