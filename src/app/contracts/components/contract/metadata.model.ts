export interface Metadata {
  identifier: string;
  department: string;
  diary: number;
  date: Date | undefined;
  title: string;
  section: string;
  pdfUrl: string;
}

export const emptyMetadata = (): Metadata => ({
  department: '',
  date: undefined,
  identifier: '',
  diary: 0,
  section: '',
  title: '',
  pdfUrl: '',
});
