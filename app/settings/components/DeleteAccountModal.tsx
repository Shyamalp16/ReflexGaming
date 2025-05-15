"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  usernameToConfirm: string | null;
  uid: string | undefined;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  usernameToConfirm,
  uid,
}) => {
  const [confirmationInput, setConfirmationInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setConfirmationInput('');
      setIsDeleting(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (confirmationInput !== usernameToConfirm) return;

    setIsDeleting(true);
    try {
      const { data, error } = await supabase.functions.invoke('delete-user', {
      });

      if (error) {
        throw error;
      }

      if (data && data.error) {
        throw new Error(data.error);
      }
      
      toast({ title: "Success", description: "Account deletion request processed." });
      onConfirmDelete();

    } catch (error: any) {
      console.error("Error deleting account via function:", error);
      toast({
        title: "Deletion Failed",
        description: error.message || "Could not delete account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!usernameToConfirm) {
    return null; 
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm Account Deletion</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Permanent Action</AlertTitle>
            <AlertDescription>
              Your Account and all its contents (profile, settings, etc.) will be permanently deleted. This action cannot be undone.
            </AlertDescription>
          </Alert>

          <DialogDescription className="text-md">
            To confirm this irreversible action, please type your username "<b>{usernameToConfirm}</b>" in the field below.
          </DialogDescription>

          <Input
            type="text"
            placeholder={`Type "${usernameToConfirm}" to confirm`}
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            className="text-base"
            disabled={isDeleting}
          />
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onClose} disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={confirmationInput !== usernameToConfirm || isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal; 