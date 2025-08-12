import { useNavigate } from 'react-router';
import useAuthStore from '../store/useAuthStore';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container text-center py-12">
        <p className="text-[var(--text)]">Loading profile...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen">
      <div>
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-[var(--primary)]">
            Your <span className="text-[var(--accent)]">Profile</span>
          </h1>
          <p className="text-[var(--text)]">
            Manage your account information
          </p>
        </header>

        {/* Profile Card */}
        <div className="card max-w-2xl mx-auto p-8">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            <div className="w-24 h-24 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--primary)] text-4xl font-bold">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-[var(--text)]">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-[var(--text)] mt-2 opacity-80">{user.email}</p>
              <p className="text-sm text-[var(--text)] mt-3 opacity-60">
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6 divide-y divide-[var(--secondary)]">
            <div className="pt-6">
              <h3 className="font-medium text-lg mb-4 text-[var(--text)]">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[var(--text)] opacity-70">
                    First Name
                  </p>
                  <p className="font-medium text-[var(--text)]">
                    {user.firstName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text)] opacity-70">
                    Last Name
                  </p>
                  <p className="font-medium text-[var(--text)]">
                    {user.lastName}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-[var(--text)] opacity-70">Email</p>
                  <p className="font-medium text-[var(--text)]">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/profile/edit')}
              className="btn btn-accent flex-1 py-3 rounded-md"
            >
              Edit Profile
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="btn btn-primary flex-1 py-3 rounded-md bg-[var(--accent)] hover:bg-[color-mix(in_srgb,_var(--accent)_90%,_black)] text-[var(--text)]"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;