import "../globals.css";
import Image from "next/image";

export const metadata = {
  title: "News-Clips",
  description: "Summary of News Articles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Image
            className="center"
            src="/Logo.png"
            width={70}
            height={70}
            alt="Logo"
          />
        </header>
        {children}
      </body>
    </html>
  );
}
