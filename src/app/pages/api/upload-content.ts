import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, file } = req.body;

    // Upload file to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('ImgAndVid')
      .upload(`public/${file.name}`, file);

    if (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }

    // Insert new content into the database
    const { data, error } = await supabase
      .from('Content')
      .insert([{ title, description, file_url: uploadData.path }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}