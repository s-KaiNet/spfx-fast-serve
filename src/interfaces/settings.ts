export interface Settings {
  $schema: string,
  cli: {
    isLibraryComponent: boolean;
  }

  serve?: {
    open: boolean;
    openUrl?: string;
    fullScreenErrors: boolean;
    loggingLevel: 'minimal' | 'normal' | 'detailed';
  }
}
