"use client";

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navbar';
import {
  LayoutDashboard, UserCog, Swords, ShieldHalf, MessageSquare, CircleUserRound, Settings2, ShieldCheck, Gamepad2, DollarSign, HelpCircle, FileText, Info
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

export default function ProfilePage() {
  const { user, isLoading, session } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ActiveView>('profileOverview');

  useEffect(() => {
    if (!isLoading && !user && !session) {
      router.push('/login');
    }
  }, [user, isLoading, session, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <p>Loading profile...</p>
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
    // For profileOverview, we can redirect or show dashboard-like content.
    // For now, as it links to /dashboard, this specific view might not be shown here if user clicks it.
    // If activeView is 'profileOverview' and the user is on /profile, they might see the default text.
    if (activeView === 'profileOverview') {
        return <div className="p-6"><h2 className='text-2xl font-semibold'>Profile Overview</h2><p>This section provides an overview of your profile, similar to the dashboard.</p></div>;
    }
    // Generic placeholder for other views
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold capitalize">{activeView.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}</h2>
            <p>Content for {activeView.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()} goes here. (Placeholder)</p>
        </div>
    );
  };

  const sidebarSections: SidebarSectionConfig[] = [
    {
      title: null, // No title for the first section
      links: [
        { id: 'profileOverview', label: 'Profile Overview', icon: <LayoutDashboard className="h-5 w-5" />, href: '/dashboard', isExternal: true },
      ]
    },
    {
      title: 'Manage Account',
      icon: <UserCog className="h-5 w-5" />,
      links: [
        { id: 'manageAccount_editProfile', label: 'Edit Profile', icon: <Settings2 className="h-5 w-5" /> },
        { id: 'manageAccount_changePassword', label: 'Change Password', icon: <ShieldCheck className="h-5 w-5" /> },
        { id: 'manageAccount_notifications', label: 'Notifications', icon: <Info className="h-5 w-5" /> },
      ]
    },
    {
      title: 'Gamer Zone',
      icon: <Swords className="h-5 w-5" />,
      links: [
        { id: 'gamerZone_myGames', label: 'My Games', icon: <Gamepad2 className="h-5 w-5" /> },
        { id: 'gamerZone_achievements', label: 'Achievements', icon: <Info className="h-5 w-5" /> },
        { id: 'gamerZone_friendList', label: 'Friend List', icon: <Info className="h-5 w-5" /> },
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
    {
      title: 'Support',
      icon: <MessageSquare className="h-5 w-5" />,
      links: [
        { id: 'support_faqs', label: 'FAQs', icon: <HelpCircle className="h-5 w-5" /> },
        { id: 'support_contactSupport', label: 'Contact Support', icon: <FileText className="h-5 w-5" /> },
        { id: 'support_troubleshooting', label: 'Troubleshooting', icon: <Info className="h-5 w-5" /> },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex container mx-auto py-8 px-4 gap-8">
        {/* Sidebar */}
        <aside className="w-64 lg:w-72 flex-shrink-0 space-y-4 sticky top-24 self-start h-[calc(100vh-7rem)] overflow-y-auto pr-4">
          <div className="flex flex-col items-center space-y-1 p-3 border-b border-border">
            <CircleUserRound className="h-16 w-16 text-muted-foreground mb-1" />
            <p className="text-md font-semibold">{user?.email?.split('@')[0] || 'User Name'}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          
          {sidebarSections.map((section, sectionIndex) => (
            <div key={section.title || sectionIndex} className="space-y-1">
              {section.title && (
                <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center">
                  {section.icon && <span className="mr-2">{section.icon}</span>}
                  {section.title}
                </h3>
              )}
              {section.links.map(link => (
                <SidebarLink 
                  key={link.id}
                  {...link}
                  isActive={activeView === link.id || (link.id === 'profileOverview' && activeView === 'profileOverview')}
                  onClick={() => !link.isExternal && setActiveView(link.id)}
                />
              ))}
            </div>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-card border border-border rounded-lg shadow-sm overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      {/* Footer is removed from here as it might be awkward with sticky sidebar, 
          can be added back if the overall page layout is not full-height for sidebar/content */}
    </div>
  );
} 