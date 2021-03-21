export interface Settings {
  cli: {
    usePnpm: boolean;
    isLibraryComponent: boolean;
    useRestProxy: boolean;
  }

  serve: {
    open: boolean;
    openUrl?: string;
  }
}
