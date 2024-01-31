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
  console.log(email, password);
  if (error) throw new Error(error.message);
  console.log(data);
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

export { login, getCurrentUser, signup };
