'use client';

import React from 'react';
import { EditorLayout } from '@/modules/editor/components';

interface EditorPageProps {
  params: {
    pageId: string;
  };
}

export default function EditorPage({ params }: EditorPageProps) {
  return <EditorLayout pageId={params.pageId} />;
}


