"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("All password fields are required.");
      return;
    }
    console.log("Change Password Submitted", { currentPassword, newPassword });
    alert("Password change submitted (no backend)"); 
    // Consider closing the dialog programmatically here
  };

  const handleChangeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    if (!newEmail) {
      setEmailError("New email address is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    console.log("Change Email Submitted", { newEmail });
    alert("Email change submitted (no backend)");
    // Consider closing the dialog programmatically here
  };
  
  const handleEnable2FA = () => {
    console.log("Enable 2FA clicked");
    alert("2FA functionality coming soon!");
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Security Settings</h2>
      
      {/* Password Management Section */}
      <div className="p-4 border border-border rounded-md space-y-3">
        <h3 className="text-lg font-medium leading-6 text-foreground">Password Management</h3>
        <p className="text-sm text-muted-foreground">
          Update your password regularly to keep your account secure.
        </p>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Change Password</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                  Enter your current password and new password below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleChangePassword} className="space-y-4 py-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                  <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required className="mt-1" />
                </div>
                {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Email Address Section */}
      <div className="p-4 border border-border rounded-md space-y-3">
        <h3 className="text-lg font-medium leading-6 text-foreground">Email Address</h3>
        <p className="text-sm text-muted-foreground">
          Manage the email address associated with your account.
        </p>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Change Email Address</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Email Address</DialogTitle>
                <DialogDescription>
                  Enter your new email address below. You might need to verify it.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleChangeEmail} className="space-y-4 py-4">
                <div>
                  <Label htmlFor="newEmail">New Email Address</Label>
                  <Input id="newEmail" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required className="mt-1" />
                </div>
                {emailError && <p className="text-sm text-destructive">{emailError}</p>}
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="p-4 border border-border rounded-md space-y-3">
        <h3 className="text-lg font-medium leading-6 text-foreground">Two-Factor Authentication (2FA)</h3>
        <p className="text-sm text-muted-foreground">
          Add an extra layer of security to your account for enhanced protection.
        </p>
        <div>
          <Button variant="outline" onClick={handleEnable2FA}>Enable 2FA</Button>
        </div>
      </div>
    </div>
  );
} 