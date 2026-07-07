import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import { ThemeProvider } from "../contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Serene - Mental Health Support Platform",
  description: "AI-powered mental health companion for college students",
  keywords: [
    "mental health",
    "student support",
    "AI companion",
    "counseling",
    "stress management",
    "mindfulness",
    "safe space",
    "PHQ-9",
    "GAD-7"
  ],
  openGraph: {
    title: "Serene - Mental Health Support Platform",
    description: "AI-powered mental health companion for college students",
    url: "https://serene-sih.vercel.app",
    siteName: "Serene",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serene - Mental Health Support Platform",
    description: "AI-powered mental health companion for college students",
  }
};

const themeScript = `
  (function() {
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
