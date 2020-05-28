import { contentParser } from './content.parser';
import { metadataParser } from './metadata.parser';
import {
  Contract,
  emptyContract,
} from '../contracts/components/contract/contract.model';
import { Content } from '../contracts/components/contract/content.model';
import { Metadata } from '../contracts/components/contract/metadata.model';

export const contractParser = (contractApiModel: any): Contract => {
  let emptyDoc: Contract = emptyContract();

  if (!contractApiModel) {
    return emptyDoc;
  }

  if (
    contractApiModel.documento &&
    contractApiModel.documento.texto &&
    contractApiModel.documento.metadatos
  ) {
    let content = undefined;
    try {
      content = contractApiModel.documento.texto[0].dl[0];
    } catch (err) {
      console.warn('malformed content', err);
    }
    let metadata = contractApiModel.documento.metadatos[0];
    let parsedContent: Content = contentParser(content);
    let parsedMetadata: Metadata = metadataParser(metadata);

    return {
      content: parsedContent,
      metadata: parsedMetadata,
    };
  }

  return emptyDoc;
};
