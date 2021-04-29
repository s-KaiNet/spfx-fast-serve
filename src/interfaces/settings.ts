export interface Settings {
  $schema: string,
  cli: {
    usePnpm: boolean;
    isLibraryComponent: boolean;
    useRestProxy: boolean;
  }

  serve?: {
    open: boolean;
    openUrl?: string;
    fullScreenErrors: boolean;
    loggingLevel: 'minimal' | 'normal' | 'detailed';
  }
}
