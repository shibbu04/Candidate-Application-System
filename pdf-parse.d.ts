declare module 'pdf-parse' {
    function PDFParse(dataBuffer: Buffer | Uint8Array): Promise<{
      numpages: number;
      numrender: number;
      info: any;
      metadata: any;
      text: string;
      version: string;
    }>;
    
    export = PDFParse;
  }