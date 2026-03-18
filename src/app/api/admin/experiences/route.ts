import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getExperiences, updateExperiences } from '@/lib/store';

export async function GET(request: NextRequest) {
  if (!validateAdminAuth(request)) return unauthorizedResponse();

  try {
    const experiences = await getExperiences();
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!validateAdminAuth(request)) return unauthorizedResponse();

  try {
    const experiences = await request.json();

    if (!Array.isArray(experiences)) {
      return NextResponse.json({ error: 'Expected array of experiences' }, { status: 400 });
    }

    const updated = await updateExperiences(experiences);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating experiences:', error);
    return NextResponse.json({ error: 'Failed to update experiences' }, { status: 500 });
  }
}
