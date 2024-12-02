import { supabase } from '@/utils/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("ImgAndVid")
      .upload(`public/${file.name}`, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const filePath = uploadData.path;

    const { data, error } = await supabase.from("Content").insert([
      {
        title,
        description,
        file_url: `https://ujbncvgdlulldcjkwcbk.supabase.co/storage/v1/object/public/ImgAndVid/${filePath}`,
      },
    ]);

    if (error) {
      console.error("Error inserting new post:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}