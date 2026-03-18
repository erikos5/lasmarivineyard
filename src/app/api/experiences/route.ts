import { NextResponse } from 'next/server';
import { getActiveExperiences } from '@/lib/store';

export async function GET() {
  try {
    const experiences = await getActiveExperiences();
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}
