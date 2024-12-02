// input = id from the request
// returns a response of the deleted post and file i.e status code

// delete the post from the database
// delete files and records from the database and storage bucket

// used by delete-post option from the posts more options

import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  // Fetch the post to get the file URL
  const { data: post, error: fetchError } = await supabase
    .from('Content')
    .select('file_url')
    .eq('id', id)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  // Delete the post from the database
  const { data: deleteData, error: deleteError } = await supabase
    .from('Content')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  // Delete the file from the storage bucket
  const fileurl = post.file_url;
  const filePath = fileurl.replace('https://ujbncvgdlulldcjkwcbk.supabase.co/storage/v1/object/public/ImgAndVid/', '');
  console.log('Deleting file:', filePath);

  const { error: storageError } = await supabase.storage
    .from('ImgAndVid')
    .remove([filePath]);

  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Post and file deleted successfully', data: deleteData });
}