export interface Settings {
  $schema: string,
  cli: {
    isLibraryComponent: boolean;
    port?: number;
  }

  serve?: {
    open: boolean;
    openUrl?: string;
    fullScreenErrors: boolean;
    loggingLevel: 'minimal' | 'normal' | 'detailed';
  }
}
