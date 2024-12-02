import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  const { title, description, file_url } = await request.json();

  const { data, error } = await supabase
    .from('Content')
    .update({ title, description, file_url })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Post updated successfully', data });
}