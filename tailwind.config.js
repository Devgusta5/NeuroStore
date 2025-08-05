/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0A0F1E",
        "neon-blue": "#2A7DE1",
        "cyber-purple": "#7F00FF",
        indigo: "#4C2A85",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        montserrat: ["Montserrat", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float-hex": "float-hex 6s ease-in-out infinite",
        "quantum-float": "quantum-float 4s ease-in-out infinite",
        "particle-float": "particle-float 2s ease-in-out infinite",
        "glow-rotate": "glow-rotate 2s linear infinite",
        "modal-appear": "modal-appear 0.5s ease-out",
        slideIn: "slideIn 0.3s ease-out",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(42, 125, 225, 0.5)",
        "glow-purple": "0 0 20px rgba(127, 0, 255, 0.5)",
        "glow-indigo": "0 0 20px rgba(76, 42, 133, 0.5)",
      },
      perspective: {
        1000: "1000px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
