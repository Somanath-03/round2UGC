// input data is sent from the client side to the api i.e all fields
// this validates and request data for the post to be updated
// returns a response of the updated post i.e status code

// used by edit-post option from the edit-posts page

import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const file = formData.get('file') as File;

  if (!title || !description) {
    return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
  }

  let fileUrl = formData.get('file_url') as string;

  if (file) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('ImgAndVid')
      .upload(`public/${file.name}`, file);

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    fileUrl = `https://ujbncvgdlulldcjkwcbk.supabase.co/storage/v1/object/public/ImgAndVid/${uploadData.path}`;
  }

  const { data, error } = await supabase
    .from('Content')
    .update({ title, description, file_url: fileUrl })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Post updated successfully', data });
}