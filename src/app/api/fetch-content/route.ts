// sends the ordered data back to requested website

import { supabase } from '@/utils/supabaseClient';
import { normalizeStorageUrl } from '@/utils/normalizeStorageUrl';
import { NextResponse } from 'next/server';
type ContentRow = {
  id: number;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Content')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = (data ?? []) as ContentRow[];
    const normalized = rows.map((row) => ({
      ...row,
      file_url: normalizeStorageUrl(row.file_url),
    }));
    return NextResponse.json({ data: normalized });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}