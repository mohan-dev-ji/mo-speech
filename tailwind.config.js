/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        brand: {
          text: "var(--brand-text)",
          "text-secondary": "var(--brand-text-secondary)",
          "text-btn": "var(--brand-text-btn)",
          line: "var(--brand-line)",
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          tertiary: "var(--brand-tertiary)",
          background: "var(--brand-background)",
          card: "var(--brand-card)",
          "icon-bg-blue": "var(--brand-icon-bg-blue)",
          "icon-bg-green": "var(--brand-icon-bg-green)",
          "icon-bg-yellow": "var(--brand-icon-bg-yellow)",
        },
        gradient: {
          from: "var(--gradient-from)",
          to: "var(--gradient-to)",
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: '#353b56', // Brand-colors/Line
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
      fontSize: {
        h1: ['64px', { lineHeight: '70px', fontWeight: '600' }], // Manrope-styles/h1
        'h1-mobile': ['48px', { lineHeight: '1.21', fontWeight: '600' }],
        h2: ['48px', { lineHeight: '50px', fontWeight: '600' }], // Manrope-styles/h2
        'h2-mobile': ['40px', { lineHeight: '1.21', fontWeight: '600' }],
        h3: ['36px', { lineHeight: '49px', fontWeight: '600' }], // Manrope-styles/h3
        'h3-mobile': ['32px', { lineHeight: '1.21', fontWeight: '600' }],
        h4: ['24px', { lineHeight: '28px', fontWeight: '600' }], // Manrope-styles/h4
        lead: ['20px', { lineHeight: '28px', fontWeight: '500' }],
        large: ['18px', { lineHeight: '28px', fontWeight: '500' }],
        p: ['16px', { lineHeight: '28px', fontWeight: '400' }], // Manrope-styles/p
        'p-bold': ['16px', { lineHeight: '28px', fontWeight: '600' }], // Manrope-styles/p-bold
        'p-ui': ['14px', { lineHeight: '24px', fontWeight: '400' }],
      },
      spacing: {
        'section-y': '64px', // Roundness and Spacing/Section-y-padding
        'section-y-mobile': '48px', // Roundness and Spacing/Section-y-padding-mobile
        'section-x': '32px', // Roundness and Spacing/Section-y-padding
        'section-x-mobile': '16px', // Roundness and Spacing/Section-y-padding-mobile-2
        'card-x': '36px', // Roundness and Spacing/Card-x-padding
        'card-y': '36px', // Roundness and Spacing/Card-y-padding
        'between-cards': '48px', // Roundness and Spacing/Space-between-cards
        'between-heading': '8px', // Roundness and Spacing/Space-between-heading
        'between-icon': '36px', // Roundness and Spacing/Space-between-icon
        'container-width': '1080px', // Roundness and Spacing/Container-width
        'divider-width': '2px', // Stroke/Divider Width
        'line-width': '2px', // Roundness and Spacing/Line-width
        'roundness': '16px', // Roundness and Spacing/Roundness
      },
      borderWidth: {
        'line-width': 'var(--line-width)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
