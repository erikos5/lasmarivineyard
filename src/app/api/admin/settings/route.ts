import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getSettings, updateSettings } from '@/lib/store';

export async function GET(request: NextRequest) {
  if (!validateAdminAuth(request)) return unauthorizedResponse();

  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!validateAdminAuth(request)) return unauthorizedResponse();

  try {
    const settings = await request.json();
    const updated = await updateSettings(settings);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
