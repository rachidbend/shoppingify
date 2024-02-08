import { supabase } from './supabase';

// Async function to handle user login authentication
async function login({ email, password }) {
  // Authenticate user using email and password
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  // Check for errors in the authentication response
  if (error) throw new Error(error.message);

  // Return user data upon successful authentication
  return data;
}

// Async function to handle user signup
async function signup({ email, password }) {
  // Sign up the user with the provided email and password
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  // Check for errors in the signup response
  if (error) throw new Error(error.message);

  // Return the signup data upon successful signup
  return data;
}

// Async function to retrieve current user data
async function getCurrentUser() {
  // Retrieve session data from Supabase authentication
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  // Throw an error if there's an error in retrieving session data
  if (sessionError) throw new Error(error.message);
  // If no active session, return null
  if (!session.session) return null;

  // Retrieve user data from Supabase authentication
  const { data, error } = await supabase.auth.getUser();

  // Throw an error if there's an error in retrieving user data
  if (error) throw new Error(error.message);

  // Return the user data
  return data?.user;
}

// Async function to handle user logout
async function logout() {
  // Sign out the user
  let { error } = await supabase.auth.signOut();

  // Check for errors in the logout response
  if (error) throw new Error(error.message);
}

// Async function to fetch user profile data from the database
async function getUserProfile({ userId }) {
  // Fetch profile data from the 'profiles' table for the provided userId
  let { data: profiles, error } = await supabase
    .from('profiles')
    .select('user_name, avatar')
    .eq('id', userId);

  // Check for errors in the response
  if (error) throw new Error(error.message);

  // Return the fetched user profile data
  return profiles;
}

// Async function to update user information
async function updateUser({ email, password }) {
  let change; // Variable to hold the changes to be made

  // Determine the type of change based on provided email and password
  // Change password only
  if (!email && password) {
    change = {
      password: password,
    };
  }

  // Change email only
  if (email && !password) {
    change = {
      email: email,
    };
  }

  // Update user information with the specified changes
  const { data, error } = await supabase.auth.updateUser(change);

  // Check for errors in the response
  if (error) throw new Error(error.message);

  // Return the updated data
  return data;
}

// Async function to update user's username
async function updateUsername({ userId, username }) {
  // Update authenticated user's username in the database
  const { data, error } = await supabase
    .from('profiles')
    .update({ user_name: username }) // Update username field with the provided username
    .eq('id', userId) // Match the user ID
    .select();

  // Check for errors in the response
  if (error) throw new Error(error.message);

  // Return the updated data
  return data;
}

// Async function to request password reset
async function forgotPassword(email) {
  // Request password reset for the provided email
  let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://shoppingify-bay.vercel.app/reset',
  });
  // Check if there's an error
  if (error) throw new Error(error.message);
  return data;
}

// Async function to handle signing in with Google OAuth
async function signInGoogle() {
  // Sign in with Google OAuth
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google', // Specify the OAuth provider (Google)
    options: {
      redirectTo: 'https://shoppingify-bay.vercel.app', // Redirect URL after authentication
    },
  });

  // Check for errors in the authentication response
  if (error) throw new Error(error.message);

  // Return the authentication data upon successful sign-in
  return data;
}

export {
  login,
  getCurrentUser,
  signup,
  logout,
  getUserProfile,
  updateUser,
  updateUsername,
  forgotPassword,
  signInGoogle,
};
