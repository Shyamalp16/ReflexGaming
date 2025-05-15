"use client";

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getUserProfile, UserProfile } from '@/lib/supabase/db';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/navbar';
import EditProfileForm from './components/EditProfileForm';
import SecuritySettings from './components/SecuritySettings';
import DeleteAccountModal from './components/DeleteAccountModal';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, UserCog, Swords, ShieldHalf, MessageSquare, CircleUserRound, Settings2, ShieldCheck, Gamepad2, DollarSign, HelpCircle, FileText, Info,
  Trophy, Users, AlertTriangle
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useQuery, QueryKey } from '@tanstack/react-query';

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
  href?: string; 
  isExternal?: boolean;
}

interface SidebarSectionConfig {
  title: string | null;
  icon?: React.ReactNode; 
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
  const { user, isLoading: authIsLoading, session } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<ActiveView>('manageAccount_editProfile');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryKey: QueryKey = ['userProfile', user?.id];

  const { 
    data: currentUserProfile, 
    isLoading: isProfileLoading, 
    error: profileError 
  } = useQuery<UserProfile | null, Error, UserProfile | null, QueryKey>({
    queryKey: queryKey,
    queryFn: async () => {
      if (!user?.id) return null;
      return getUserProfile(user.id);
    },
    enabled: !!user?.id && !authIsLoading,
  });

  useEffect(() => {
    if (!authIsLoading && !user && !session) {
      router.push('/login');
    }
  }, [user, authIsLoading, session, router]);

  useEffect(() => {
    if (profileError) {
      console.error("Error fetching user profile for settings page (from useEffect):", profileError);
      toast({ 
        title: "Error Fetching Profile", 
        description: profileError.message || "Could not fetch your profile data. Please try refreshing the page.", 
        variant: "destructive" 
      });
    }
    // If getUserProfile returns null when profile is not found, and useQuery's data becomes null.
    // We need to check if user exists but profile data is null (after loading is finished).
    if (!isProfileLoading && user && !currentUserProfile && !profileError) {
        // This handles the case where getUserProfile resolves to null (e.g., profile doesn't exist in DB yet)
        // It's important not to show this if there was a fetch error, which is handled by `profileError`
         toast({ title: "Profile Data Missing", description: "Your profile data could not be loaded. You might need to complete your profile.", variant: "default" });
    }
  }, [profileError, currentUserProfile, isProfileLoading, user, toast]);

  if (authIsLoading || (!!user && isProfileLoading)) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Navbar />
        <p className="mt-8">Loading settings...</p>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
            <Navbar />
            <p className="mt-8">Redirecting to login...</p>
        </div>
    );
  }

  const handleOpenDeleteModal = () => {
    if (currentUserProfile && currentUserProfile.username) {
      setIsDeleteModalOpen(true);
    } else {
      toast({ title: "Unable to Delete Account", description: "Your username is not available. Please ensure your profile is fully loaded and has a username.", variant: "destructive"});
    }
  };

  const handleActualAccountDeletion = async () => {
    toast({ title: "Account Deletion Confirmed", description: "Processing account deletion...", variant: "default" });
    setIsDeleteModalOpen(false);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out after account deletion:", error);
        toast({ title: "Logout Error", description: "Could not sign you out automatically. Please try logging out manually.", variant: "destructive" });
        window.location.href = '/'; 
      } else {
        toast({ title: "Logged Out", description: "You have been logged out. Redirecting to homepage..." });
        setTimeout(() => {
          window.location.href = '/'; 
        }, 1500);
      }
    } catch (e) {
      console.error("Client-side error after account deletion attempt:", e);
      toast({ title: "Error", description: "An unexpected error occurred. Redirecting to homepage...", variant: "destructive" });
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  };

  const renderContent = () => {
    if (activeView === 'manageAccount_editProfile') {
      return <EditProfileForm 
                userProfile={currentUserProfile ?? null}
                isLoadingProfile={isProfileLoading}
             />;
    }
    if (activeView === 'manageAccount_changePassword') {
      return <SecuritySettings />;
    }
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
        <aside className="w-64 lg:w-72 flex-shrink-0 flex flex-col justify-between sticky top-24 self-start pr-4 h-[calc(100vh-theme(space.24)-theme(space.16))]">
          <div>
            {sidebarSections.map((section, sectionIndex) => (
              <div key={section.title || sectionIndex} className="space-y-1 mb-4">
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
          </div>

          <div className="mt-auto pt-4 border-t border-border flex justify-center">
            <Button 
              variant="destructive" 
              className="justify-start text-left"
              onClick={handleOpenDeleteModal}
              disabled={authIsLoading || isProfileLoading || !currentUserProfile || !currentUserProfile.username}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Delete Account
            </Button>
          </div>
        </aside>

        <main className="flex-1 bg-card border border-border rounded-lg shadow-sm overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleActualAccountDeletion}
        usernameToConfirm={currentUserProfile?.username || null}
        uid={user?.id}
      />
    </div>
  );
} 