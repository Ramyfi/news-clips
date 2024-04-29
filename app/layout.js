// Layout component to structure the template of the App. Rameshwari Kothapalli, Natasha Machado.
import "../globals.css";
import Image from "next/image"; // Logo of the NewsClips app

export const metadata = {
  title: "News-Clips",
  description: "Summary of News Articles",
};

export default function RootLayout({ children }) { //Root Layout that defines the structure of the app.
  return (
    <html lang="en">
      <body>
        {/* Header section with the App Logo */}
        <header>    
          <Image
            className="center" 
            src="/Logo.png"
            width={70}
            height={70}
            alt="Logo"
          />
        </header>
        {/* Child components or other pages are rendered here */}
        {children} 
      </body>
    </html>
  );
}
