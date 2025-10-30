-- Fix RLS Policies - Run this in Supabase SQL Editor
-- This fixes the infinite recursion error

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can insert users" ON users;
DROP POLICY IF EXISTS "Admins can update users" ON users;

DROP POLICY IF EXISTS "Users can view their assigned tasks" ON tasks;
DROP POLICY IF EXISTS "Admins can view all tasks" ON tasks;
DROP POLICY IF EXISTS "Admins can insert tasks" ON tasks;
DROP POLICY IF EXISTS "Admins can update tasks" ON tasks;
DROP POLICY IF EXISTS "Admins can delete tasks" ON tasks;

DROP POLICY IF EXISTS "Users can view their assigned files" ON files;
DROP POLICY IF EXISTS "Admins can view all files" ON files;
DROP POLICY IF EXISTS "Admins can insert files" ON files;
DROP POLICY IF EXISTS "Admins can delete files" ON files;

DROP POLICY IF EXISTS "Users can view their own tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can view all tickets" ON support_tickets;
DROP POLICY IF EXISTS "Authenticated users can create tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can update tickets" ON support_tickets;

-- Create new simplified policies for users table
CREATE POLICY "Authenticated users can view users" ON users
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert users" ON users
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update users" ON users
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create new simplified policies for tasks table
CREATE POLICY "Authenticated users can view tasks" ON tasks
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update tasks" ON tasks
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete tasks" ON tasks
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create new simplified policies for files table
CREATE POLICY "Authenticated users can view files" ON files
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert files" ON files
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete files" ON files
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create new simplified policies for support_tickets table
CREATE POLICY "Authenticated users can view tickets" ON support_tickets
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create tickets" ON support_tickets
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update tickets" ON support_tickets
  FOR UPDATE USING (auth.uid() IS NOT NULL);
