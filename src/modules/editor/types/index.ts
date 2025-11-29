export interface EditorProps {
  pageId?: string;
  templateId?: string;
}

export interface SectionEditorProps {
  sectionId: string;
  onUpdate: (updates: any) => void;
}


