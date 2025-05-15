import React, { useState, useEffect } from 'react';

interface EditProfileFormProps {
  // Add props if needed, e.g., initial data
}

const EditProfileForm: React.FC<EditProfileFormProps> = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    mobileNumber: '',
    username: '',
    bio: '',
    timezone: '',
    // avatar: null, // Will be handled by file input, preview by avatarPreview
  });
  const [dateInputType, setDateInputType] = useState<'text' | 'date'>('text');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup function to revoke the object URL to prevent memory leaks
    return () => {
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (avatarPreview && avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview); // Revoke old URL before creating new one
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
      // If you need to store the File object for submission:
      // setFormData(prevState => ({ ...prevState, avatar: file })); 
    } else {
      setAvatarPreview(null);
      // setFormData(prevState => ({ ...prevState, avatar: null }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="p-6 space-y-6 rounded-lg bg-card shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Section 1: Personal Information */}
        <div className="p-4 border border-border rounded-md space-y-4">
          <h3 className="text-lg font-medium leading-6 text-foreground">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-1">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-1">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-muted-foreground mb-1">Username / Display Name</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" required />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-muted-foreground mb-1">Date of Birth</label>
              <input 
                type={dateInputType}
                id="dateOfBirth" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
                onFocus={() => setDateInputType('date')}
                onBlur={() => {
                  if (!formData.dateOfBirth) {
                    setDateInputType('text');
                  }
                }}
                placeholder="Date of Birth"
                className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none md:w-auto" />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Location */}
        <div className="p-4 border border-border rounded-md space-y-4">
          <h3 className="text-lg font-medium leading-6 text-foreground">Contact & Location</h3>
          <div className="space-y-4">
            <div className="md:w-1/2">
              <label htmlFor="country" className="block text-sm font-medium text-muted-foreground mb-1">Country</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" required />
            </div>
            <div className="md:w-1/2">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-muted-foreground mb-1">Mobile Number</label>
              <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" />
            </div>
            <div className="md:w-1/2">
              <label htmlFor="timezone" className="block text-sm font-medium text-muted-foreground mb-1">Timezone</label>
              <input type="text" id="timezone" name="timezone" value={formData.timezone} onChange={handleChange} className="block w-full rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none" required />
            </div>
          </div>
        </div>

        {/* Section 3: Profile Details */}
        <div className="p-4 border border-border rounded-md space-y-4">
          <h3 className="text-lg font-medium leading-6 text-foreground">Profile Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 items-start">
            {/* Left Column: Bio and File Input */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-muted-foreground mb-1">Bio</label>
                <textarea 
                  id="bio" 
                  name="bio" 
                  rows={3} 
                  value={formData.bio} 
                  onChange={handleChange} 
                  className="block w-full md:w-4/5 rounded-md border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-muted-foreground mb-1">Avatar / Profile Picture</label>
                <input 
                  type="file" 
                  id="avatar" 
                  name="avatar" 
                  accept="image/*"
                  onChange={handleAvatarChange} 
                  className="block w-full md:w-4/5 text-sm text-muted-foreground file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Right Column: Avatar Preview */}
            <div className="flex flex-col items-center md:items-start md:pl-2">
              <label className="block text-sm font-medium text-muted-foreground mb-1 text-center md:text-left">Preview</label>
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover border border-border shadow-sm" />
              ) : (
                <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground text-xs shadow-sm">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm; 