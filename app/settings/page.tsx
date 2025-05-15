"use client";

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';
import EditProfileForm from './components/EditProfileForm';
import SecuritySettings from './components/SecuritySettings';
import {
  LayoutDashboard, UserCog, Swords, ShieldHalf, MessageSquare, CircleUserRound, Settings2, ShieldCheck, Gamepad2, DollarSign, HelpCircle, FileText, Info,
  Trophy, Users
} from 'lucide-react';

// Define types for sidebar views
type ActiveView = 
  | 'profileOverview'
  | 'manageAccount_editProfile' | 'manageAccount_changePassword' | 'manageAccount_notifications'
  | 'gamerZone_myGames' | 'gamerZone_achievements' | 'gamerZone_friendList'
  | 'hostZone_myRigs' | 'hostZone_hostingSetup' | 'hostZone_earnings'
  | 'support_faqs' | 'support_contactSupport' | 'support_troubleshooting';

interface SidebarLinkConfig {
  id: ActiveView;
  label: string;
  icon: React.ReactNode;
  href?: string; // Optional
  isExternal?: boolean; // Optional
}

interface SidebarSectionConfig {
  title: string | null;
  icon?: React.ReactNode; // Optional for section title
  links: SidebarLinkConfig[];
}

interface SidebarLinkProps extends SidebarLinkConfig {
  isActive: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, id, label, icon, isActive, onClick, isExternal }) => {
  const baseClasses = "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors";
  const activeClasses = isActive ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary" : "hover:bg-muted hover:text-foreground";
  
  const content = (
    <>
      {icon}
      <span>{label}</span>
    </>
  );

  if (isExternal && href) {
    return (
      <Link href={href} className={`${baseClasses} ${activeClasses}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses} w-full text-left`}>
      {content}
    </button>
  );
};

export default function SettingsPage() {
  const { user, isLoading, session } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ActiveView>('manageAccount_editProfile');

  useEffect(() => {
    if (!isLoading && !user && !session) {
      router.push('/login');
    }
  }, [user, isLoading, session, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <p>Loading settings...</p>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  const renderContent = () => {
    if (activeView === 'manageAccount_editProfile') {
      return <EditProfileForm />;
    }
    if (activeView === 'manageAccount_changePassword') {
      return <SecuritySettings />;
    }
    // Generic placeholder for other views
    // Ensure the activeView string formatting is consistent if you add more views
    const viewTitle = activeView.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold capitalize">{viewTitle}</h2>
            <p>Content for {viewTitle} goes here. (Placeholder)</p>
        </div>
    );
  };

  const sidebarSections: SidebarSectionConfig[] = [
    {
      title: 'Manage Account',
      icon: <UserCog className="h-5 w-5" />,
      links: [
        { id: 'manageAccount_editProfile', label: 'Edit Profile', icon: <Settings2 className="h-5 w-5" /> },
        { id: 'manageAccount_changePassword', label: 'Security', icon: <ShieldCheck className="h-5 w-5" /> },
      ]
    },
    {
      title: 'Gamer Zone',
      icon: <Swords className="h-5 w-5" />,
      links: [
        { id: 'gamerZone_myGames', label: 'My Games', icon: <Gamepad2 className="h-5 w-5" /> },
        { id: 'gamerZone_achievements', label: 'Achievements', icon: <Trophy className="h-5 w-5" /> },
        { id: 'gamerZone_friendList', label: 'Friend List', icon: <Users className="h-5 w-5" /> },
      ]
    },
    {
      title: 'Host Zone',
      icon: <ShieldHalf className="h-5 w-5" />,
      links: [
        { id: 'hostZone_myRigs', label: 'My Rigs', icon: <Settings2 className="h-5 w-5" /> },
        { id: 'hostZone_hostingSetup', label: 'Hosting Setup', icon: <Info className="h-5 w-5" /> },
        { id: 'hostZone_earnings', label: 'Earnings', icon: <DollarSign className="h-5 w-5" /> },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex container mx-auto py-8 px-4 gap-8">
        {/* Sidebar */}
        <aside className="w-64 lg:w-72 flex-shrink-0 space-y-4 sticky top-24 self-start pr-4">
          {sidebarSections.map((section, sectionIndex) => (
            <div key={section.title || sectionIndex} className="space-y-1">
              {section.title && (
                <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center">
                  {section.icon && <span className="mr-2">{section.icon}</span>}
                  {section.title}
                </h3>
              )}
              <div className={section.title ? "mt-2 space-y-1" : "space-y-1"}>
                {section.links.map(link => (
                  <SidebarLink 
                    key={link.id}
                    {...link}
                    isActive={activeView === link.id}
                    onClick={() => !link.isExternal && setActiveView(link.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-card border border-border rounded-lg shadow-sm overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
} 