export type GrapesBlockDefinition = {
  id: string;
  label: string;
  category: string;
  content: string;
  attributes?: Record<string, string>;
  media?: string;
};

export type GrapesAsset = {
  id: string;
  src: string;
  type?: 'image' | 'video' | 'audio' | 'doc';
  name?: string;
};

export type GrapesTemplateResponse = {
  projectId: string;
  title: string;
  description: string;
  components: string;
  styles: string;
  assets: GrapesAsset[];
  blocks: GrapesBlockDefinition[];
};

export type GrapesTemplatePayload = Pick<
  GrapesTemplateResponse,
  'projectId' | 'components' | 'styles'
> & {
  updatedAt: string;
};

