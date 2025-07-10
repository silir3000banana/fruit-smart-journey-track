-- Disable email confirmation for testing by updating auth settings
UPDATE auth.config SET 
  enable_signup = true,
  email_confirmation = false
WHERE true;