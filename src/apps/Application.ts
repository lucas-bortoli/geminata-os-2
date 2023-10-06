export interface Metadata {
  readonly appId: string;
  readonly appName: string;
  readonly icon: {
    16: string;
  };
}

export interface Application {
  onExit(): Promise<void>;
}

export function Application() {
  return (applicationClass: Metadata) => {};
}
