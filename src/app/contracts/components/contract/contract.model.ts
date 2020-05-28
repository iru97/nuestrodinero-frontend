import { emptyMetadata, Metadata } from './metadata.model';
import { Content, emptyContent } from './content.model';

export interface Contract {
  metadata: Metadata;
  content: Content;
}

export const emptyContract = (): Contract => ({
  metadata: emptyMetadata(),
  content: emptyContent(),
});
