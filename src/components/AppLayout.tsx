import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { navigationStyle } = useAppContext();

  if (navigationStyle === 'top') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="ml-4" />
            <div className="flex-1" />
            {/* Additional header controls can go here */}
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;