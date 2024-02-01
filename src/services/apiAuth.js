import { supabase } from './supabase';

async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}

async function signup({ email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .insert([{ id: data.user.id }])
    .select();

  if (profileError) throw new Error(profileError.message);
  return data;
}

async function getCurrentUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw new Error(error.message);
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

async function getUserProfile({ userId }) {
  let { data: profiles, error } = await supabase
    .from('profiles')
    .select('user_name, avatar')
    .eq('id', userId);

  if (error) throw new Error(error.message);

  return profiles;
}

async function updateUser({ email, password }) {
  let change;

  // change password only
  if (!email && password) {
    change = {
      password: password,
    };
  }
  // change email only
  if (email && !password) {
    change = {
      email: email,
    };
  }

  // change both email and password
  if (email && password) {
    change = {
      email: email,
      password: password,
    };
  }

  const { data, error } = await supabase.auth.updateUser(change);
  if (error) throw new Error(error.message);
  return data;
}

async function updateUsername({ userId, username }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ user_name: username })
    .eq('id', userId)
    .select();
  if (error) throw new Error(error.message);
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
};
