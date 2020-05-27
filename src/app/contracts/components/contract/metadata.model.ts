export interface Metadata {
  identifier: string;
  department: string;
  diaryNumber: number;
  date: Date;
  title: string;
  section: string;
  pdfUrl: string;
}

export const emptyMetadata = (): Metadata => ({
  department: '',
  date: undefined,
  identifier: '',
  diaryNumber: 0,
  section: '',
  title: '',
  pdfUrl: '',
});
