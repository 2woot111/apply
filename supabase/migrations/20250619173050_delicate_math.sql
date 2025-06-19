/*
  # Create phone submissions table

  1. New Tables
    - `phone_submissions`
      - `id` (uuid, primary key)
      - `phone_number` (text, stores formatted phone numbers)
      - `created_at` (timestamp, when the submission was made)

  2. Security
    - Enable RLS on `phone_submissions` table
    - Add policy for public insert access (since this is a public form)
    - Add policy for authenticated users to read all submissions (for admin purposes)
*/

CREATE TABLE IF NOT EXISTS phone_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE phone_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert phone submissions (public form)
CREATE POLICY "Anyone can submit phone numbers"
  ON phone_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all submissions (for admin purposes)
CREATE POLICY "Authenticated users can read all submissions"
  ON phone_submissions
  FOR SELECT
  TO authenticated
  USING (true);